
"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { addMoney, handleWithdrawals } from "@/app/actions";





const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {

    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com"
}];



export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState("");
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState<"add" | "withdraw">("add");
    const [loading, setLoading] = useState(false);

    const tabBase = "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200";
    const tabActive = "bg-white text-[#FF0052] shadow-sm";
    const tabInactive = "text-stone-500 hover:text-stone-700";

    return <Card title={mode === "add" ? "Add Money" : "Withdraw"}>
        <div className="w-full">
            <div className="mb-4 flex w-full rounded-xl border border-gray-200 bg-gray-100 p-1">
                <button
                    type="button"
                    onClick={() => setMode("add")}
                    className={`${tabBase} ${mode === "add" ? tabActive : tabInactive}`}
                >
                    Add money to wallet
                </button>
                <button
                    type="button"
                    onClick={() => setMode("withdraw")}
                    className={`${tabBase} ${mode === "withdraw" ? tabActive : tabInactive}`}
                >
                    Withdraw to bank
                </button>
            </div>

            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(t) => {
                setAmount(Number(t));

            }} />
            <div className="pb-1.5 pt-4 text-sm font-medium text-stone-700">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                setProvider(value)
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="pt-6">
                {mode === "add" ? (
                    <Button onClick={async () => {
                        if (!(amount > 0)) {
                            return alert("Please enter an amount greater than zero")
                        }
                        setLoading(true)
                        try {
                            await addMoney(amount, provider)
                        } catch (e) {
                            setLoading(false)
                            if (e instanceof Error) {
                                return alert(e.message)
                            }
                        }
                        window.location.href = redirectUrl || ""
                    }}>
                        {loading ? <span className="inline-flex items-center gap-2"><Spinner />Processing…</span> : "Add Money"}
                    </Button>
                ) : (
                    <Button onClick={async () => {
                        if (!(amount > 0)) {
                            return alert("Please enter an amount greater than zero")
                        }
                        setLoading(true)
                        try { await handleWithdrawals(amount, provider) }
                        catch (e) {
                            setLoading(false)
                            alert(e instanceof Error ? e.message : "something went wrong")
                        }
                        window.location.href = redirectUrl || ""
                    }}>
                        {loading ? <span className="inline-flex items-center gap-2"><Spinner />Processing…</span> : "Withdraw"}
                    </Button>
                )}
            </div>
        </div>
    </Card>
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
    );
}
