"use client"
import { Button } from "./button";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => Promise<void>,
    onSignout: () => Promise<void>
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#D9CFC7] bg-[#F9F8F6]/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9B59C] text-sm font-bold text-stone-900">P</span>
            PayTM
        </div>
        <div className="inline-flex">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </header>
}
