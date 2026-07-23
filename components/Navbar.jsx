'use client'
import { Search, ShoppingCart, UserRound, LogOut, HeartIcon, Package, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="sticky top-0 z-50 glass transition-all duration-300">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 hover:opacity-80 transition-opacity">
                        <span className="text-emerald-500">Ven</span>dora<span className="text-emerald-500 text-5xl leading-0">.</span>
                        <p className="absolute text-[10px] font-bold -top-1 -right-8 px-2 py-0.5 rounded-full flex items-center gap-2 text-white bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-md uppercase tracking-wider">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-6 lg:gap-8 text-slate-600 font-medium text-sm">
                        <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
                        <Link href="/shop" className="hover:text-emerald-500 transition-colors">Shop</Link>
                        <Link href="/about" className="hover:text-emerald-500 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-64 text-sm gap-2 bg-slate-100/80 border border-slate-200/50 px-4 py-2.5 rounded-full shadow-inner focus-within:ring-2 ring-emerald-100 focus-within:bg-white transition-all duration-300">
                            <Search size={16} className="text-slate-400" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/wishlist" className="relative flex items-center gap-2 text-slate-600 hover:text-emerald-500 transition-colors group">
                            <div className="p-2 bg-slate-100 rounded-full group-hover:bg-emerald-50 transition-colors">
                                <HeartIcon size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-semibold">Wishlist</span>
                        </Link>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-emerald-500 transition-colors group">
                            <div className="p-2 bg-slate-100 rounded-full group-hover:bg-emerald-50 transition-colors">
                                <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-semibold">Cart</span>
                            <button className="absolute -top-1 -right-2 text-[9px] font-bold text-white bg-rose-500 w-4 h-4 rounded-full flex items-center justify-center shadow-sm">{cartCount}</button>
                        </Link>

                        {session?.user ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-2 bg-slate-50 pl-3 pr-4 py-1.5 rounded-full border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all">
                                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full font-bold text-xs">
                                        {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{session.user.name}</span>
                                </div>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                    <div className="p-2 space-y-1">
                                        <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors">
                                            <User size={16} /> My Account
                                        </Link>
                                        <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors">
                                            <Package size={16} /> My Orders
                                        </Link>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => signIn()} className="px-7 py-2.5 bg-slate-900 hover:bg-emerald-600 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-white rounded-full font-semibold tracking-wide text-sm flex items-center gap-2">
                                <UserRound size={16} /> Login
                            </button>
                        )}
                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden flex items-center gap-4">
                        <Link href="/wishlist" className="relative">
                            <HeartIcon size={22} className="text-slate-700" />
                        </Link>
                        <Link href="/cart" className="relative">
                            <ShoppingCart size={22} className="text-slate-700" />
                            <span className="absolute -top-1.5 -right-2 text-[9px] font-bold text-white bg-rose-500 w-4 h-4 rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>
                        </Link>
                        {session?.user ? (
                            <div className="relative group cursor-pointer">
                                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full font-bold text-sm shadow-sm border border-emerald-200">
                                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                {/* Mobile Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                    <div className="p-2 space-y-1">
                                        <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors">
                                            <User size={16} /> My Account
                                        </Link>
                                        <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors">
                                            <Package size={16} /> My Orders
                                        </Link>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => signIn()} className="px-5 py-1.5 bg-slate-900 hover:bg-emerald-600 transition-colors text-white text-xs font-semibold rounded-full">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
