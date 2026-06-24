import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
            <div className="w-64 h-64 mb-8">
                {/* SVG Illustration */}
                <svg className="w-full h-full text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Page Not Found</h2>
            <p className="text-slate-500 mb-8 max-w-md text-lg">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link
                href="/"
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold tracking-wide hover:bg-indigo-700 transition-colors shadow-sm"
            >
                Back Home
            </Link>
        </div>
    );
}
