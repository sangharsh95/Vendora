'use client'
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-[80vh] bg-slate-50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Have a question, feedback, or need assistance? Our team is always here to help. Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                            <p className="text-slate-500 text-sm mb-3">Drop us a line anytime.</p>
                            <a href="mailto:support@Vendoracom" className="text-emerald-600 font-semibold hover:underline">support@Vendora.com</a>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us</h3>
                            <p className="text-slate-500 text-sm mb-3">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+15550123" className="text-blue-600 font-semibold hover:underline">+91 95069 xxxxx</a>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Us</h3>
                            <p className="text-slate-500 text-sm mb-3">Come say hello at our HQ.</p>
                            <span className="text-amber-600 font-semibold">BBDNIIT, Lucknow</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                                    <input type="text" placeholder="John" className="p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                    <input type="text" placeholder="Doe" className="p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea rows="5" placeholder="How can we help you?" className="p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" required></textarea>
                            </div>
                            <button className="w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
