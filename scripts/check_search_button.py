from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5183"
USERNAME = "superadmin"
PASSWORD = "Admin@2024"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        requests = []

        def handle_request(request):
            url = request.url
            if "/admin-api/" in url and any(token in url for token in ["chatbot-route", "admin-user", "datasource", "token-alert-config", "login-log-page", "login-log"]):
                requests.append(url)

        page.on("request", handle_request)
        page.goto(BASE_URL)
        page.locator("input").nth(0).fill(USERNAME)
        page.locator("input").nth(1).fill(PASSWORD)
        page.get_by_role("button", name="登录").click()
        page.wait_for_load_state("networkidle")

        page.goto(f"{BASE_URL}/login-log-page")
        page.wait_for_load_state("networkidle")
        before = len(requests)
        page.screenshot(path="/Users/zlbg/code/wpplus/wp-admin-trae/scripts/search-debug.png", full_page=True)
        print("BUTTONS", page.locator("button").all_inner_texts())

        selects = page.locator("form select")
        if selects.count():
            selects.first.select_option(index=1)
        page.locator("button[type='submit']").click()
        page.wait_for_load_state("networkidle")
        after = len(requests)
        page.get_by_role("button", name="重置").click()
        page.wait_for_load_state("networkidle")
        after_reset = len(requests)

        print("REQUESTS_BEFORE", before)
        print("REQUESTS_AFTER", after)
        print("REQUESTS_AFTER_RESET", after_reset)
        print("LAST_REQUESTS", requests[-5:])

        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
