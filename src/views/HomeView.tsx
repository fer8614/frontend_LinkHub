import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LinkIcon, Share2, Palette, BarChart3, Zap, Globe } from "lucide-react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

const features = [
    {
        icon: LinkIcon,
        title: "One Link, Everything",
        description: "Consolidate all your social profiles into a single, shareable link.",
    },
    {
        icon: Palette,
        title: "Beautiful Profiles",
        description: "Stand out with a sleek, modern profile page that reflects your brand.",
    },
    {
        icon: Share2,
        title: "Easy Sharing",
        description: "Share your LinkHub anywhere — bios, emails, business cards, and more.",
    },
    {
        icon: Zap,
        title: "Instant Setup",
        description: "Create your profile in seconds. No coding or design skills required.",
    },
    {
        icon: BarChart3,
        title: "Drag & Drop",
        description: "Reorder your links with intuitive drag-and-drop to highlight what matters.",
    },
    {
        icon: Globe,
        title: "Public Profile",
        description: "Get a clean public URL that works everywhere, on any device.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
};

export default function HomeView() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-5%] left-[30%] w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            <Header />

            {/* Hero */}
            <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/2 space-y-8 text-center lg:text-left"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.15 } },
                            }}
                        >
                            <motion.div className="space-y-4" variants={fadeUp} custom={0}>
                                <span className="inline-block text-sm font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5">
                                    Your digital identity
                                </span>
                                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black gradient-text leading-[1.1]">
                                    All your links.
                                    <br />
                                    One place.
                                </h1>
                            </motion.div>

                            <motion.p
                                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0"
                                variants={fadeUp}
                                custom={1}
                            >
                                Share your GitHub, LinkedIn, Instagram, YouTube, and every other profile with a single, beautiful link.
                            </motion.p>

                            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" variants={fadeUp} custom={2}>
                                <Link
                                    to="/auth/register"
                                    className="gradient-button px-8 py-3.5 text-base font-semibold rounded-xl text-center"
                                >
                                    <span>Get Started Free</span>
                                </Link>
                                <Link
                                    to="/auth/login"
                                    className="gradient-button-secondary px-8 py-3.5 text-base font-semibold rounded-xl text-center"
                                >
                                    Sign In
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2 w-full max-w-md mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <SearchForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 py-24 border-t border-white/5">
                <div className="mx-auto max-w-6xl px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4">
                            Everything you need
                        </h2>
                        <p className="text-white/50 text-lg max-w-2xl mx-auto">
                            Simple yet powerful tools to create and manage your online presence.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                className="card-modern-dark p-6 group"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeUp}
                            >
                                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:border-purple-500/30">
                                    <feature.icon className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-24 border-t border-white/5">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="card-modern p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Ready to simplify your online presence?
                        </h2>
                        <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                            Join thousands of creators, developers, and professionals who use LinkHub to connect with their audience.
                        </p>
                        <Link
                            to="/auth/register"
                            className="gradient-button inline-block px-10 py-4 text-lg font-bold rounded-xl"
                        >
                            <span>Create Your LinkHub</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-8">
                <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-sm">
                        &copy; {new Date().getFullYear()} LinkHub. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/auth/login" className="text-white/30 hover:text-white/60 text-sm">Sign In</Link>
                        <Link to="/auth/register" className="text-white/30 hover:text-white/60 text-sm">Register</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}