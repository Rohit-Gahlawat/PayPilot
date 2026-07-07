import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

const WEBHOOK_URL = process.env.BANK_WEBHOOK_URL || "http://localhost:3003";
const MIN_DELAY = Number(process.env.BANK_MIN_DELAY_MS) || 3000;
const MAX_DELAY = Number(process.env.BANK_MAX_DELAY_MS) || 10000;
const FAILURE_RATE = Number(process.env.BANK_FAILURE_RATE) || 0.15;


function randomDelay() {
    return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
}

function randomStatus() {
    return Math.random() < FAILURE_RATE ? "Failed" : "Success";
}

async function notifyBank(path: string, payload: object) {
    try {
        await fetch(`${WEBHOOK_URL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.log(e);
    }
}


app.post("/onramp", (req, res) => {
    const paymentInfo = {
        token: req.body.token,
        user_identifier: req.body.user_identifier,
        amount: req.body.amount
    }

    res.status(202).json({
        message: "processing"
    });

    setTimeout(() => {
        const status = randomStatus();
        notifyBank("/hdfcwebhook", {
            token: paymentInfo.token,
            user_identifier: paymentInfo.user_identifier,
            amount: paymentInfo.amount,
            status: status
        });
    }, randomDelay());
})


app.post("/payout", (req, res) => {
    const paymentInfo = {
        token: req.body.token,
        user_identifier: req.body.user_identifier,
        amount: req.body.amount,
        kind: req.body.kind
    }

    res.status(202).json({
        message: "processing"
    });

    const path = paymentInfo.kind === "merchant" ? "/merchant/withdrawal" : "/user/withdrawal";
    setTimeout(() => {
        const status = randomStatus();
        notifyBank(path, {
            token: paymentInfo.token,
            user_identifier: paymentInfo.user_identifier,
            amount: paymentInfo.amount,
            status: status
        });
    }, randomDelay());
})

app.listen(3004, () => console.log("bank-server is running on port 3004"));
