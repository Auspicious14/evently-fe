from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Create scratch directory if it doesn't exist
    os.makedirs("jules-scratch/verification", exist_ok=True)

    # Homepage
    page.goto("http://localhost:3000")
    page.screenshot(path="jules-scratch/verification/final-homepage.png")

    # Login page
    page.goto("http://localhost:3000/login")
    page.screenshot(path="jules-scratch/verification/final-loginpage.png")

    # Events page
    page.goto("http://localhost:3000/events")
    page.screenshot(path="jules-scratch/verification/final-eventspage.png")

    # Submit page
    page.goto("http://localhost:3000/submit")
    page.screenshot(path="jules-scratch/verification/final-submitpage.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
