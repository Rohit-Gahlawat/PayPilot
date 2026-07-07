export default function Loading() {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
            <svg className="h-8 w-8 animate-spin text-[#FF0052]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
            <p className="text-sm text-gray-500">Loading…</p>
        </div>
    );
}
