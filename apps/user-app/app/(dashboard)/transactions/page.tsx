import db from "@repo/db";
import { auth } from "@/auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { TransactionsToggle } from "../../../components/TransactionsToggle";
import { MerchantTransactions } from "../../../components/MerchantTransactions";
import { redirect } from "next/navigation";

async function getOnRampTransactions() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) { return [] };
    const onramps = await db.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    });
    const withdrawals = await db.userWithdrawal.findMany({
        where: {
            userId: userId
        }
    });

    const combined = [
        ...onramps.map(t => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status as string,
            provider: t.provider,
            kind: "onramp" as const
        })),
        ...withdrawals.map(t => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status as string,
            provider: t.provider,
            kind: "withdrawal" as const
        }))
    ];

    combined.sort((a, b) => b.time.getTime() - a.time.getTime());
    return combined;
}

async function getP2PTransactions() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) { return [] };
    const txns = await db.p2P.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        },
        orderBy: {
            timestamp: "desc"
        }
    });
    return txns.map(t => {
        const sent = t.fromUserId === userId;
        const other = sent ? t.toUser : t.fromUser;
        return {
            time: t.timestamp,
            amount: t.amount,
            type: sent ? ("sent" as const) : ("received" as const),
            name: other?.name ?? null,
            number: other?.number ?? ""
        }
    })
}

async function getMerchantTransactions() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) { return [] };
    const txns = await db.merchantTransaction.findMany({
        where: {
            fromUserId: userId
        },
        include: {
            toUser: true
        },
        orderBy: {
            timestamp: "desc"
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        name: t.toUser?.name ?? null,
        merchantId: t.toUserId
    }))
}

export default async function TransactionsPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/signin")
    }
    const bankTransactions = await getOnRampTransactions();
    const p2pTransactions = await getP2PTransactions();
    const merchantTransactions = await getMerchantTransactions();

    return <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
                Transactions
            </h1>
            <p className="mt-1 text-sm text-stone-500">
                Your recent bank top-ups and peer-to-peer transfers.
            </p>
        </header>
        <TransactionsToggle
            bank={<OnRampTransactions transactions={bankTransactions} />}
            p2p={<P2PTransactions transactions={p2pTransactions} />}
            merchant={<MerchantTransactions transactions={merchantTransactions} />}
        />
    </div>
}
