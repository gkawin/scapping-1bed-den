import playwright from "playwright";
import request from 'request'

function notify(message) {
    var options = {
        'method': 'POST',
        'url': 'https://notify-api.line.me/api/notify',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${process.env.LINE_TOKEN}`
        },
        form: {
            'message': message
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

const browser = await playwright.chromium.launch({ headless: true, })
const context = await browser.newContext()
const page = await context.newPage()

await page.goto("https://www.cpliving.com/apartments/metro", { waitUntil: "networkidle" })

const suites = await page.locator("div.suite").all()

for await (const el of suites) {
    const bedroom = await el.locator(".suite-type>.bedroom").textContent()
    const availability = await el.locator(".availability>.big").textContent()

    if (bedroom && bedroom.toLowerCase().trim().includes("1")) {
        if (bedroom.toLowerCase().trim().includes("den")) {
            notify(`ห้องว่างแล้ว ${bedroom.trim()}: ${availability.trim()} https://www.cpliving.com/apartments/metro`)
        }
    }
    console.log(`${bedroom.trim()} , ${availability.trim()}`)
}

await browser.close()