const statusStyles: Record<string, string> = {
    Success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Processing: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Failed: "bg-rose-50 text-rose-700 ring-rose-600/20"
};

export const MerchantWithdrawals = ({
    withdrawals
}: {
    withdrawals: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (withdrawals.length === 0) {
        return <div className="py-10 text-center text-sm text-gray-400">
            No withdrawals yet
        </div>;
    }

    return <div className="flex flex-col divide-y divide-gray-200">
        {withdrawals.map((w, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">
                        Withdrawn to bank
                    </div>
                    <div className="text-xs text-gray-400">
                        {w.provider} · {w.time.toDateString()}
                    </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                    <div className="text-sm font-semibold tabular-nums text-rose-600">
                        − ₹ {w.amount / 100}
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${statusStyles[w.status] ?? "bg-gray-100 text-gray-600 ring-gray-600/20"}`}>
                        {w.status}
                    </span>
                </div>
            </div>
        ))}
    </div>;
};
