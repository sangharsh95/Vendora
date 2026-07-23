'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react"

export default function MyOrdersPage() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const { data: session, status } = useSession()
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        } else if (status === 'authenticated') {
            fetchOrders()
        }
    }, [status])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/user/orders')
            if (res.ok) {
                const data = await res.json()
                setOrders(data.orders)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'ORDER_PLACED': return <Clock size={16} className="text-amber-500" />
            case 'PROCESSING': return <Package size={16} className="text-blue-500" />
            case 'SHIPPED': return <Truck size={16} className="text-purple-500" />
            case 'DELIVERED': return <CheckCircle size={16} className="text-emerald-500" />
            default: return <XCircle size={16} className="text-slate-400" />
        }
    }

    const formatStatus = (status) => {
        return status.replace('_', ' ')
    }

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-pulse flex gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><div className="w-3 h-3 bg-emerald-500 rounded-full animation-delay-200"></div><div className="w-3 h-3 bg-emerald-500 rounded-full animation-delay-400"></div></div></div>
    }

    return (
        <div className="min-h-[80vh] bg-slate-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">My Orders</h1>
                    <p className="text-slate-500 mt-2">View and track your recent purchases.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Package size={40} className="text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h2>
                        <p className="text-slate-500 max-w-md mb-8">When you place an order, it will appear here so you can track its status.</p>
                        <button onClick={() => router.push('/shop')} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Start Shopping</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Order ID</p>
                                        <p className="text-sm font-bold text-slate-800">#{order.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date Placed</p>
                                        <p className="text-sm font-medium text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Amount</p>
                                        <p className="text-sm font-bold text-emerald-600">{currency}{order.total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                                        {getStatusIcon(order.status)}
                                        <span className="text-xs font-bold text-slate-700">{formatStatus(order.status)}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 p-2">
                                                    {item.product.images[0] ? (
                                                        <Image src={item.product.images[0]} width={50} height={50} className="object-contain w-full h-full mix-blend-multiply" alt={item.product.name} />
                                                    ) : (
                                                        <Package className="text-slate-300" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity} × {currency}{item.price}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-slate-800">{currency}{(item.quantity * item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
