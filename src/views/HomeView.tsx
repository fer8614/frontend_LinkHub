import Header from "../components/Header";

export default function HomeView() {
    return (
        <div>
            <Header />

            <main className="bg-gray-100 min-h-screen py-10 lg:bg-[url('/bg.svg')] bg-no-repeat bg-right-top lg:bg-[size:50%]">
                <div className="mx-auto max-w-5xl mt-10">
                    <div className="lg:w-1/2 px-10 lg:px-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            All your <span className="text-cyan-400">Social Networks</span> in one link
                        </h1>

                        <p className="text-xl text-slate-800">
                        Join our developer community by sharing your social media accounts, including your GitHub, LinkedIn, Instagram, YouTube, Facebook, and more profiles.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}