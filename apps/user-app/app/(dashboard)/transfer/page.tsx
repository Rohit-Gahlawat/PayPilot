import db from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { auth } from "@/auth";

async function getBalance() {
    const session = await auth();
    const balance = await db.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await auth();
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
                Transfer
            </h1>
            <p className="mt-1 text-sm text-stone-500">
                Add money to your wallet and track your recent top-ups.
            </p>
        </header>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
                <AddMoney />
            </div>
            <div className="flex flex-col gap-5">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}
