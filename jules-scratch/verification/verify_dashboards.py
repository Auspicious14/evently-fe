
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

    # Register and login as a regular user
    page.goto(f"http://localhost:{port}/signup")
    page.fill('input[id="username"]', 'testuser')
    page.fill('input[id="email"]', 'testuser@test.com')
    page.fill('input[id="password"]', 'password')
    page.fill('input[id="confirmPassword"]', 'password')
    page.check('input[id="terms"]')
    page.click('button[type="submit"]')
    page.wait_for_load_state("networkidle")

    # Verify user dashboard
    page.screenshot(path="jules-scratch/verification/user-dashboard.png")
    page.click('button:has-text("My Events")')
    page.wait_for_selector("text=Submit New Event")
    page.screenshot(path="jules-scratch/verification/user-my-events.png")
    page.click('button:has-text("Logout")')
    page.wait_for_load_state("networkidle")

    # Login as admin
    page.goto(f"http://localhost:{port}/login")
    page.fill('input[id="email"]', 'admin@eventnaija.com')
    page.fill('input[id="password"]', 'password')
    page.click('button[type="submit"]')
    page.wait_for_load_state("networkidle")

    # Verify admin dashboard
    page.goto(f"http://localhost:{port}/admin")
    page.wait_for_selector("text=Events Management")
    page.screenshot(path="jules-scratch/verification/admin-dashboard.png")
    page.click('button:has-text("Events Management")')
    page.wait_for_selector("text=Review, approve, and manage all event submissions.")
    page.screenshot(path="jules-scratch/verification/admin-events-management.png")


    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
