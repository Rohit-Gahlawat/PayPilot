import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex items-center justify-between border-b border-[#D9CFC7] py-3">
            <span className="text-sm text-stone-500">
                Unlocked balance
            </span>
            <span className="text-sm font-medium tabular-nums text-stone-800">
                {amount / 100} INR
            </span>
        </div>
        <div className="flex items-center justify-between border-b border-[#D9CFC7] py-3">
            <span className="text-sm text-stone-500">
                Total Locked Balance
            </span>
            <span className="text-sm font-medium tabular-nums text-stone-800">
                {locked / 100} INR
            </span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-[#C9B59C]/20 px-4 py-3">
            <span className="text-sm font-semibold text-stone-800">
                Total Balance
            </span>
            <span className="text-base font-bold tabular-nums text-stone-900">
                {(locked + amount) / 100} INR
            </span>
        </div>
    </Card>
}
