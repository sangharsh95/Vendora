async function run() {
    const payload = {
        items: [
            { id: "cmrfu67bb0000r07okdkkyexv", name: "Product 1", price: 50, quantity: 1, images: [] }
        ],
        totalAmount: 50,
        address: {
            id: "addr_1",
            name: "Sangarch",
            email: "sangarch@example.com",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
            phone: "1234567890"
        }
    };

    console.log("Testing /api/stripe...");
    try {
        const res = await fetch('http://localhost:3000/api/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log("Stripe Result:", data);
    } catch(e) {
        console.error("Stripe Fetch Error:", e);
    }
}
run();
