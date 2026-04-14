from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5182"
USERNAME = "superadmin"
PASSWORD = "Admin@2024"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 1200})
        page.goto(BASE_URL)
        inputs = page.locator("input")
        inputs.nth(0).fill(USERNAME)
        inputs.nth(1).fill(PASSWORD)
        page.get_by_role("button", name="登录").click()
        page.wait_for_load_state("networkidle")

        page.goto(f"{BASE_URL}/chatbot-route")
        page.wait_for_load_state("networkidle")
        page.get_by_role("button", name="编辑").first.click()
        page.wait_for_timeout(800)

        fields = page.locator("form input, form textarea, form select").evaluate_all(
            """els => els.map(el => ({
                tag: el.tagName,
                type: el.type || '',
                name: el.name || '',
                value: el.value || ''
            }))"""
        )
        print(fields)
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

