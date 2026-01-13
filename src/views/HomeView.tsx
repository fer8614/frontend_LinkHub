import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
            <Header />

            <main className="min-h-screen py-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="mx-auto max-w-6xl mt-2 px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-7xl md:text-8xl font-black gradient-text leading-tight">
                                    All your Social Networks
                                </h1>
                                <p className="text-2xl font-bold text-white">
                                    in one link
                                </p>
                            </div>

                            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                                Join our developer community by sharing your social media accounts, including your GitHub, LinkedIn, Instagram, YouTube, Facebook, and more profiles.
                            </p>
                        </div>

                        <div className="lg:w-1/2 flex items-center justify-center mt-40">
                            <SearchForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}