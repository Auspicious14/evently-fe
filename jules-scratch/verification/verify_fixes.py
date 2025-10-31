
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

    # Verify homepage
    page.goto(f"http://localhost:{port}")
    page.wait_for_selector('a[href^="/events/"]')
    page.screenshot(path="jules-scratch/verification/homepage.png")

    # Get a valid event ID from the homepage
    event_link = page.query_selector('a[href^="/events/"]')
    event_id = event_link.get_attribute('href').split('/')[-1]

    # Verify submit page
    page.goto(f"http://localhost:{port}/submit")
    page.screenshot(path="jules-scratch/verification/submit-page.png")

    # Verify event detail page
    page.goto(f"http://localhost:{port}/events/{event_id}")
    page.wait_for_selector("h1")
    page.screenshot(path="jules-scratch/verification/event-detail-page.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
