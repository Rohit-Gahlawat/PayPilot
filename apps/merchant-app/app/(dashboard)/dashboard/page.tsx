import db from "@repo/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card } from "@repo/ui/card";
import { WithdrawCard } from "../../../components/WithdrawCard";
import { PaymentsToggle } from "../../../components/PaymentsToggle";
import { MerchantReceived } from "../../../components/MerchantReceived";
import { MerchantWithdrawals } from "../../../components/MerchantWithdrawals";

async function getBalance(merchantId: number) {
    const balance = await db.merchantBalance.findFirst({
        where: { merchantId }
    });
    return {
        amount: balance?.amount ?? 0,
        locked: balance?.locked ?? 0
    };
}

async function getReceivedTransactions(merchantId: number) {
    const txns = await db.merchantTransaction.findMany({
        where: { toUserId: merchantId },
        include: { fromUser: true },
        orderBy: { timestamp: "desc" }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        name: t.fromUser?.name ?? null,
        number: t.fromUser?.number ?? ""
    }));
}

async function getWithdrawals(merchantId: number) {
    const wds = await db.merchantWithdrawal.findMany({
        where: { userId: merchantId },
        orderBy: { startTime: "desc" }
    });
    return wds.map(w => ({
        time: w.startTime,
        amount: w.amount,
        status: w.status as string,
        provider: w.provider
    }));
}

export default async function MerchantDashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/signin");
    }
    const merchantId = Number(session.user.id);
    const balance = await getBalance(merchantId);
    const transactions = await getReceivedTransactions(merchantId);
    const withdrawals = await getWithdrawals(merchantId);

    return (
        <div className="mx-auto w-full max-w-5xl p-4 sm:p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Merchant Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    {session.user.name ? `Welcome back, ${session.user.name}` : "Welcome back"}
                </p>
            </header>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="flex flex-col gap-5">
                    <Card title={"Balance"}>
                        <div className="flex items-center justify-between border-b border-gray-200 py-3">
                            <span className="text-sm text-stone-500">
                                Unlocked balance
                            </span>
                            <span className="text-sm font-medium tabular-nums text-stone-800">
                                {balance.amount / 100} INR
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 py-3">
                            <span className="text-sm text-stone-500">
                                Total Locked Balance
                            </span>
                            <span className="text-sm font-medium tabular-nums text-stone-800">
                                {balance.locked / 100} INR
                            </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded-xl bg-[#399918]/10 px-4 py-3">
                            <span className="text-sm font-semibold text-stone-800">
                                Total Balance
                            </span>
                            <span className="text-base font-bold tabular-nums text-[#399918]">
                                {(balance.locked + balance.amount) / 100} INR
                            </span>
                        </div>
                    </Card>

                    <WithdrawCard balance={balance.amount} />
                </div>

                <PaymentsToggle
                    received={<MerchantReceived transactions={transactions} />}
                    withdrawals={<MerchantWithdrawals withdrawals={withdrawals} />}
                />
            </div>
        </div>
    );
}
