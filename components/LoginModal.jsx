'use client'
import React, { useState } from 'react';
import { XIcon, LogInIcon, UserPlusIcon, ArrowRightIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                });

                if (res.error) {
                    toast.error(res.error);
                } else {
                    toast.success('Successfully logged in!');
                    onClose();
                }
            } else {
                // Register
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                
                const data = await res.json();
                if (res.ok) {
                    toast.success('Account created! Logging in...');
                    // Automatically log them in after registration
                    await signIn('credentials', { email, password, redirect: false });
                    onClose();
                } else {
                    toast.error(data.error || 'Failed to create account');
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/50 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-white/50 rounded-full p-2 hover:bg-white transition-all z-10"
                >
                    <XIcon size={20} />
                </button>

                <div className="p-8 pb-0">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-slate-500 mb-8">
                        {isLogin ? 'Enter your details to securely check out.' : 'Sign up to speed up your checkout process.'}
                    </p>

                    <div className="flex bg-slate-100 rounded-full p-1 mb-8 relative">
                        <div 
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out ${isLogin ? 'left-1' : 'left-[calc(50%+3px)]'}`}
                        />
                        <button 
                            className={`flex-1 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors ${isLogin ? 'text-slate-800' : 'text-slate-500'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            <span className="flex items-center justify-center gap-2"><LogInIcon size={16}/> Sign In</span>
                        </button>
                        <button 
                            className={`flex-1 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors ${!isLogin ? 'text-slate-800' : 'text-slate-500'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            <span className="flex items-center justify-center gap-2"><UserPlusIcon size={16}/> Sign Up</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-8 pb-8 flex flex-col gap-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all" 
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all" 
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all" 
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        disabled={loading}
                        className="mt-4 w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Secure Sign In' : 'Create Account')}
                        {!loading && <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
