'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (isLogin) {
            // Login
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password
            })
            if (res?.error) {
                toast.error(res.error)
            } else {
                toast.success("Successfully logged in!")
                router.push("/")
                router.refresh()
            }
        } else {
            // Register
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if (res.ok) {
                    toast.success("Account created! Logging you in...")
                    await signIn('credentials', {
                        redirect: false,
                        email: formData.email,
                        password: formData.password
                    })
                    router.push("/")
                    router.refresh()
                } else {
                    toast.error(data.error || "Registration failed")
                }
            } catch (error) {
                toast.error("Network error")
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className="text-slate-500">{isLogin ? 'Sign in to access your cart and wishlist.' : 'Join Vendora today.'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <input 
                            type="password" 
                            required 
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 font-bold hover:underline">
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    )
}
