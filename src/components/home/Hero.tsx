import { Search, SearchableArticle } from "@/components/search/Search";

interface HeroProps {
    articles: SearchableArticle[];
}

export function Hero({ articles }: HeroProps) {
    return (
        <section className="relative overflow-visible bg-gradient-to-b from-blue-50/50 to-white pb-16 pt-20 lg:pt-32">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-1/2 -ml-[40rem] -mt-16 w-[80rem] h-[80rem] rounded-full bg-blue-100/20 blur-3xl -z-10" />
            <div className="absolute top-0 right-1/2 -mr-[40rem] -mt-16 w-[80rem] h-[80rem] rounded-full bg-purple-100/20 blur-3xl -z-10" />

            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    How can we help you?
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Find answers, troubleshooting guides, and tips to get the most out of Flashboard.
                </p>

                <div className="mt-10">
                    <Search articles={articles} />
                </div>
            </div>
        </section>
    );
}
