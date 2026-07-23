'use client'
import Link from "next/link"
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-50 pt-20 pb-32 xl:pt-32 xl:pb-40">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
                    <div className="w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                </div>
                <div className="absolute top-0 right-0 -translate-y-12 -translate-x-1/3">
                    <div className="w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Welcome to the future of commerce</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
                        Shop smarter, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">live better.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                        Discover a curated collection of premium products designed to elevate your everyday life. Fast shipping, secure payments, and top-tier customer service.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/shop" className="px-8 py-4 bg-slate-900 hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:shadow-emerald-500/30 text-white rounded-full font-bold text-lg flex items-center gap-2 group hover:-translate-y-1">
                            Start Shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-all rounded-full font-bold text-lg">
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full mb-6">
                                <ShoppingBag size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Curated Selection</h3>
                            <p className="text-slate-600">We carefully select every product to ensure it meets our high standards of quality and design.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full mb-6">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
                            <p className="text-slate-600">Your transactions are protected by industry-leading security and encryption protocols.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 flex items-center justify-center rounded-full mb-6">
                                <Truck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Delivery</h3>
                            <p className="text-slate-600">Get your items quickly with our expedited shipping options available worldwide.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
