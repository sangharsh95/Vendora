const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const puppeteer = require('puppeteer');
const path = require('path');

const prisma = new PrismaClient();

async function run() {
    console.log("Setting up test user...");
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'e2e@example.com' },
        update: { password: hashedPassword },
        create: {
            name: 'E2E Tester',
            email: 'e2e@example.com',
            password: hashedPassword
        }
    });

    console.log("Starting browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        console.log("Navigating to login...");
        // In gocart, login is triggered by clicking 'Login' in Navbar or clicking Place Order when unauthenticated.
        // Let's go to /cart and trigger login.
        await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle0' });
        
        console.log("Waiting for Login button or Place Order...");
        // Wait a bit for React to hydrate
        await new Promise(r => setTimeout(r, 2000));
        
        // Is LoginModal open? No. We need to click "Place Order" or "Login"
        // Let's just navigate to a page that forces login, or click Place Order.
        // Wait, if cart is empty, Place Order might be disabled.
        console.log("Adding product to cart via API or clicking shop...");
        await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 2000));
        
        // Find an "Add to Cart" button (lucide ShoppingCart icon usually inside a button)
        // Let's just click the first product card
        const productLink = await page.$('a[href^="/product/"]');
        if (productLink) {
            await productLink.click();
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await new Promise(r => setTimeout(r, 2000));
            
            console.log("Clicking Add to Cart...");
            const addToCartBtn = await page.$('button.bg-slate-900'); // Usually black button
            if (addToCartBtn) await addToCartBtn.click();
            await new Promise(r => setTimeout(r, 1000));
        }

        console.log("Going to cart...");
        await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 2000));

        console.log("Clicking Place Order...");
        // Text might be 'Place Order'
        const placeOrderBtn = await page.evaluateHandle(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            return btns.find(b => b.textContent.includes('Place Order'));
        });
        
        if (placeOrderBtn) {
            await placeOrderBtn.click();
            await new Promise(r => setTimeout(r, 2000));
        }

        console.log("Typing login credentials...");
        // LoginModal should be open
        const emailInput = await page.$('input[type="email"]');
        if (emailInput) {
            await emailInput.type('e2e@example.com');
            const passInput = await page.$('input[type="password"]');
            await passInput.type('password123');
            await page.keyboard.press('Enter');
            await new Promise(r => setTimeout(r, 3000));
        }

        console.log("Clicking Stripe Radio...");
        const stripeRadio = await page.$('input#STRIPE');
        if (stripeRadio) {
            await stripeRadio.click();
        }

        console.log("Selecting Address...");
        const addressSelect = await page.$('select');
        if (addressSelect) {
            // Select the second option (first dummy address)
            await page.select('select', '0');
        }

        console.log("Clicking Place Order again...");
        const placeOrderBtn2 = await page.evaluateHandle(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            return btns.find(b => b.textContent.includes('Place Order'));
        });
        
        if (placeOrderBtn2) {
            await placeOrderBtn2.click();
            console.log("Waiting for redirect to Stripe...");
            await new Promise(r => setTimeout(r, 5000)); // Wait for API and redirect
            
            const currentUrl = page.url();
            console.log("Current URL after click:", currentUrl);
            
            await page.screenshot({ path: path.join(__dirname, 'stripe-redirect.png') });
            console.log("Screenshot saved to stripe-redirect.png");
            
            if (currentUrl.includes('checkout.stripe.com')) {
                console.log("SUCCESS! Stripe redirect worked perfectly!");
            } else {
                console.log("FAILED to redirect to Stripe. URL is:", currentUrl);
            }
        } else {
            console.log("Place order button not found.");
        }

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await browser.close();
        process.exit(0);
    }
}
run();
