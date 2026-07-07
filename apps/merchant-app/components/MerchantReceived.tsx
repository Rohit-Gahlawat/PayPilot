export const MerchantReceived = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        name: string | null,
        number: string
    }[]
}) => {
    if (transactions.length === 0) {
        return <div className="py-10 text-center text-sm text-gray-400">
            No payments received yet
        </div>;
    }

    return <div className="flex flex-col divide-y divide-gray-200">
        {transactions.map((t, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#399918]/10 text-xs font-semibold text-[#399918]">
                        {(t.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-gray-700">
                            From {t.name || t.number}
                        </div>
                        <div className="text-xs text-gray-400">
                            {t.time.toDateString()}
                        </div>
                    </div>
                </div>
                <div className="shrink-0 text-sm font-semibold tabular-nums text-[#399918]">
                    + ₹ {t.amount / 100}
                </div>
            </div>
        ))}
    </div>;
};
