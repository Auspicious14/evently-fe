
import re
import time
from playwright.sync_api import sync_playwright

def get_port_from_log():
    for _ in range(10):  # Retry for 10 seconds
        try:
            with open('dev.log', 'r') as f:
                log_content = f.read()
                match = re.search(r'http://localhost:(\d+)', log_content)
                if match:
                    return match.group(1)
        except FileNotFoundError:
            pass
        time.sleep(1)
    return None

def run(playwright):
    port = get_port_from_log()
    if not port:
        raise Exception("Could not determine the port from dev.log")

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Register
    page.goto(f"http://localhost:{port}/signup")
    page.fill('input[id="username"]', 'testuser')
    page.fill('input[id="email"]', 'testuser@test.com')
    page.fill('input[id="password"]', 'password')
    page.fill('input[id="confirmPassword"]', 'password')
    page.check('input[id="terms"]')
    page.click('button[type="submit"]')
    page.wait_for_load_state("networkidle")


    # Log in
    page.goto(f"http://localhost:{port}/login")
    page.fill('input[id="email"]', 'testuser@test.com')
    page.fill('input[id="password"]', 'password')
    page.click('button[type="submit"]')
    page.wait_for_load_state("networkidle")

    # Verify dashboard
    page.screenshot(path="jules-scratch/verification/dashboard.png")

    # Verify "My Events" tab
    page.click('button:has-text("My Events")')
    page.wait_for_selector("text=Submit New Event")
    page.screenshot(path="jules-scratch/verification/my-events.png")


    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
