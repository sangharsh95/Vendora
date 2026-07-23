'use client'
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-[80vh] bg-slate-50 py-16 px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="p-12 lg:p-16 flex flex-col justify-center">
                        <h1 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-3">Our Story</h1>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Redefining your <br/> shopping experience.</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Founded with a passion for quality and convenience, Vendora was created to bridge the gap between premium products and everyday shoppers. We believe that everyone deserves access to top-tier items without the hassle.
                        </p>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Our team works around the clock to source, verify, and deliver the best products directly to your doorstep. We are more than just a store; we are a community dedicated to a better lifestyle.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span className="font-medium text-slate-700">100% Quality Guarantee</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span className="font-medium text-slate-700">Ethically Sourced Products</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span className="font-medium text-slate-700">Award-winning Customer Support</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-200 min-h-[400px] relative">
                        {/* Placeholder for an about image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 opacity-90 flex items-center justify-center p-12 text-center">
                             <h3 className="text-white text-3xl font-bold italic">"Quality is not an act, it is a habit."</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
