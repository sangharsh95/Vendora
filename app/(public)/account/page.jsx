'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { User, Mail, Shield, Settings } from "lucide-react"

export default function AccountPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status])

    if (status === 'loading' || !session) {
        return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-pulse flex gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><div className="w-3 h-3 bg-emerald-500 rounded-full animation-delay-200"></div><div className="w-3 h-3 bg-emerald-500 rounded-full animation-delay-400"></div></div></div>
    }

    return (
        <div className="min-h-[80vh] bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">My Account</h1>
                    <p className="text-slate-500 mt-2">Manage your profile details and preferences.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-inner mb-4">
                                {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">{session.user.name}</h2>
                            <p className="text-sm text-slate-500 mt-1">{session.user.email}</p>
                            <span className="mt-4 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest border border-emerald-100">Active Member</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="border-b border-slate-100 bg-slate-50/50 p-6">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User size={20} className="text-emerald-500" /> Personal Information</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                                            {session.user.name}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium flex items-center gap-2">
                                            <Mail size={16} className="text-slate-400" /> {session.user.email}
                                        </div>
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm">Edit Profile</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="border-b border-slate-100 bg-slate-50/50 p-6">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Shield size={20} className="text-blue-500" /> Security</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-600 text-sm mb-4">Keep your account secure by updating your password regularly.</p>
                                <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors text-sm">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
