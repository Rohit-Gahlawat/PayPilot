"use client"
import { handleWithdrawals } from "@/actions";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { useRouter } from "next/navigation";


export function WithdrawCard({ balance }: { balance: number }) {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    async function handleClick() {
        if (loading) return;
        if (!(Number(amount) > 0)) {
            setFeedback({ type: "error", message: "Please enter an amount greater than zero" });
            return;
        }
        setFeedback(null);
        setLoading(true);
        try {
            await handleWithdrawals(Number(amount), "0");
            setFeedback({ type: "success", message: "Withdrawal requested" });
            setTimeout(() => router.refresh(), 1200);
        } catch (e) {
            setFeedback({ type: "error", message: e instanceof Error ? e.message : "something went wrong" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card title="Withdraw to Bank">
            <div className="w-full">
                <div className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Available: ₹ {balance / 100}
                </div>
                {feedback && (
                    <div className={`mb-3 rounded-lg px-3 py-2 text-sm ${feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {feedback.message}
                    </div>
                )}
                <TextInput label="Amount" placeholder="Enter amount" onChange={(v) => setAmount(v)} />
                {amount ? (
                    <div className="pt-2 text-xs text-gray-400">
                        Withdrawing ₹ {amount} to your bank account.
                    </div>
                ) : null}

                <div className="pt-6">
                    <Button onClick={handleClick}>
                        {loading ? <span className="inline-flex items-center gap-2"><Spinner />Processing…</span> : "Withdraw"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
    );
}
