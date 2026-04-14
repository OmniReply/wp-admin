from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5179"
USERNAME = "superadmin"
PASSWORD = "Admin@2024"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 1200})
        page.goto(BASE_URL)
        page.locator("input").nth(0).fill(USERNAME)
        page.locator("input").nth(1).fill(PASSWORD)
        page.get_by_role("button", name="登录").click()
        page.wait_for_load_state("networkidle")

        page.goto(f"{BASE_URL}/chatbot-route")
        page.wait_for_load_state("networkidle")
        page.get_by_role("button", name="新增").click()
        page.wait_for_timeout(500)

        labels = page.locator("label").all_inner_texts()
        selects = page.locator("select")
        print("LABELS", labels[:12])
        print("SELECT_COUNT", selects.count())
        if selects.count():
            for idx in range(selects.count()):
                print(f"OPTIONS_{idx}", selects.nth(idx).locator("option").all_inner_texts())

        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

