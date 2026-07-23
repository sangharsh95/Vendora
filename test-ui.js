const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
    console.log("Starting browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        console.log("Navigating to cart...");
        await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle0' });
        
        console.log("Adding items to cart (using local storage if needed, or logging in)");
        // Since we need to be logged in to checkout, let's login first
        
        console.log("Trying to find Place Order button...");
        
        // Wait for 2 seconds to let React hydrate
        await new Promise(r => setTimeout(r, 2000));
        
        // Find Stripe radio button
        const stripeRadio = await page.$('input#STRIPE');
        if (stripeRadio) {
            console.log("Clicking Stripe Radio...");
            await stripeRadio.click();
        } else {
            console.log("Stripe Radio not found! Might need to login or add to cart.");
        }
        
        // Let's take a screenshot
        await page.screenshot({ path: path.join(__dirname, 'checkout-test.png') });
        console.log("Screenshot saved.");

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await browser.close();
    }
}
run();
