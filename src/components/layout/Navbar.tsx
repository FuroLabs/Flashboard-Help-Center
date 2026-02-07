import Link from "next/link";
import { Search } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Flashboard <span className="text-blue-600">Help</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Home
                        </Link>
                        <Link href="/submit-request" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Submit a Request
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Search Icon placeholder - typically hidden on desktop if search is in hero */}
                    <button className="md:hidden p-2 text-gray-500 hover:text-gray-900">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link
                        href="https://flashboard.app"
                        className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Go to App
                    </Link>
                </div>
            </div>
        </nav>
    );
}
