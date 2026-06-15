import { Card } from "@repo/ui/card"
import { OnRampStatusType } from "@repo/db";



export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatusType,
        provider: string
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
        <div className="flex flex-col divide-y divide-[#D9CFC7]">
            {transactions.map((t, i) => <div key={i} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                    <div className="text-sm font-medium text-stone-700">
                        Received INR
                    </div>
                    <div className="text-xs text-stone-400">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="shrink-0 text-sm font-semibold tabular-nums text-stone-800">
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}
