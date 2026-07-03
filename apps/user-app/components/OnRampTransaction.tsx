import { Card } from "@repo/ui/card"

const statusStyles: Record<string, string> = {
    Success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Processing: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Failed: "bg-rose-50 text-rose-700 ring-rose-600/20"
};

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string,
        kind: "onramp" | "withdrawal"
    }[]
}) => {

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="py-10 text-center text-sm text-stone-400">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="flex flex-col divide-y divide-gray-200">
            {transactions.map((t, i) => {
                const isWithdrawal = t.kind === "withdrawal";
                return <div key={i} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                        <div className="text-sm font-medium text-stone-700">
                            {isWithdrawal ? "Withdrawn to bank" : "Added to wallet"}
                        </div>
                        <div className="text-xs text-stone-400">
                            {t.provider} · {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                        <div className={`text-sm font-semibold tabular-nums ${isWithdrawal ? "text-rose-600" : "text-emerald-600"}`}>
                            {isWithdrawal ? "−" : "+"} Rs {t.amount / 100}
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${statusStyles[t.status] ?? "bg-stone-100 text-stone-600 ring-stone-600/20"}`}>
                            {t.status}
                        </span>
                    </div>
                </div>
            })}
        </div>
    </Card>
}
