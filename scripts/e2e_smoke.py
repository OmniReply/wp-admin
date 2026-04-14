import os
import pathlib
import sys
import time
from typing import List, Tuple

from playwright.sync_api import Page, sync_playwright


ROOT = pathlib.Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / "scripts" / "e2e_artifacts"


def env(name: str, default: str = "") -> str:
    value = os.getenv(name)
    return value if value is not None else default


def ensure_dir(path: pathlib.Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def find_input_by_label(page: Page, label_text: str):
    return page.locator(f'div:has(> label:has-text("{label_text}")) input').first


def take(page: Page, name: str) -> None:
    ensure_dir(ARTIFACTS)
    page.screenshot(path=str(ARTIFACTS / f"{name}.png"), full_page=True)


def main() -> int:
    base_url = env("APP_URL", "http://localhost:5174").rstrip("/")
    username = env("ADMIN_USERNAME")
    password = env("ADMIN_PASSWORD")

    if not username or not password:
        print("Missing credentials: set ADMIN_USERNAME and ADMIN_PASSWORD", file=sys.stderr)
        return 2

    console_lines: List[str] = []
    page_errors: List[str] = []
    request_failures: List[Tuple[str, str]] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(ignore_https_errors=True, viewport={"width": 1600, "height": 1200})
        page = context.new_page()

        page.on("console", lambda msg: console_lines.append(f"[console:{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on(
            "requestfailed",
            lambda req: request_failures.append((req.url, req.failure.error_text if req.failure else "unknown")),
        )

        page.goto(base_url, wait_until="domcontentloaded")
        page.wait_for_timeout(300)
        take(page, "00-entry")

        if "/login" in page.url:
            user_input = find_input_by_label(page, "用户名")
            pass_input = find_input_by_label(page, "密码")

            user_input.wait_for(state="visible", timeout=15000)
            user_input.fill(username)
            pass_input.fill(password)

            take(page, "01-login-filled")

            page.get_by_role("button", name="登录").click()
            page.wait_for_timeout(400)

        page.wait_for_load_state("networkidle", timeout=20000)
        take(page, "02-after-login")

        page.wait_for_timeout(300)
        if "/login" in page.url:
            take(page, "99-still-login")
            print("Still on /login after submitting credentials.", file=sys.stderr)
            return 3

        page.goto(f"{base_url}/dashboard", wait_until="domcontentloaded")
        page.wait_for_load_state("networkidle", timeout=20000)
        take(page, "03-dashboard")

        if not (page.get_by_text("User Trend").count() or page.get_by_text("Order Trend").count()):
            take(page, "98-dashboard-missing-stats")
            print("Dashboard stats not found (expected User Trend/Order Trend).", file=sys.stderr)
            return 4

        page.goto(f"{base_url}/user", wait_until="domcontentloaded")
        page.wait_for_load_state("networkidle", timeout=20000)
        take(page, "04-user-list")

        page.get_by_text("操作").first.wait_for(state="visible", timeout=15000)

        ensure_dir(ARTIFACTS)
        (ARTIFACTS / "console.log").write_text("\n".join(console_lines) + "\n", encoding="utf-8")
        (ARTIFACTS / "page_errors.log").write_text("\n".join(page_errors) + "\n", encoding="utf-8")
        (ARTIFACTS / "request_failures.log").write_text(
            "\n".join([f"{url} :: {error}" for url, error in request_failures]) + "\n", encoding="utf-8"
        )

        context.close()
        browser.close()

    if page_errors:
        print("Page errors detected. See scripts/e2e_artifacts/page_errors.log", file=sys.stderr)
        return 5

    print("E2E smoke test passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
