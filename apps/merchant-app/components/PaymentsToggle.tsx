"use client"
import { Card } from "@repo/ui/card";
import { useState } from "react";
import type { ReactNode } from "react";

export function PaymentsToggle({
    received,
    withdrawals
}: {
    received: ReactNode;
    withdrawals: ReactNode;
}) {
    const [tab, setTab] = useState<"received" | "withdrawals">("received");
    const base = "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200";
    const active = "bg-white text-[#FF0052] shadow-sm";
    const inactive = "text-stone-500 hover:text-stone-700";

    return (
        <Card title={tab === "received" ? "Payments Received" : "Withdrawals"}>
            <div className="mb-4 flex w-full rounded-xl border border-gray-200 bg-gray-100 p-1">
                <button
                    type="button"
                    onClick={() => setTab("received")}
                    className={`${base} ${tab === "received" ? active : inactive}`}
                >
                    Received
                </button>
                <button
                    type="button"
                    onClick={() => setTab("withdrawals")}
                    className={`${base} ${tab === "withdrawals" ? active : inactive}`}
                >
                    Withdrawals
                </button>
            </div>
            {tab === "received" ? received : withdrawals}
        </Card>
    );
}
