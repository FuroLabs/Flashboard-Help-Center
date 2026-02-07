import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Flashboard
                        </span>
                        <p className="mt-4 text-sm text-gray-500 max-w-xs">
                            The next-generation keyboard for power users. Customizable, fast, and privacy-focused.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Download</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Changelog</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Beta Program</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Support</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Help Center</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Twitter</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Furo Labs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
