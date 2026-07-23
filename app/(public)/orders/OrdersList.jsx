'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/features/cart/cartSlice';

const StatusBadge = ({ status }) => {
    const configs = {
        'ORDER_PLACED': { icon: Package, color: 'bg-blue-100 text-blue-700', label: 'Order Placed' },
        'PROCESSING': { icon: Clock, color: 'bg-amber-100 text-amber-700', label: 'Processing' },
        'SHIPPED': { icon: Truck, color: 'bg-purple-100 text-purple-700', label: 'Shipped' },
        'DELIVERED': { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700', label: 'Delivered' }
    };
    
    const config = configs[status] || configs['ORDER_PLACED'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${config.color}`}>
            <Icon size={14} /> {config.label}
        </span>
    );
};

export default function OrdersList({ initialOrders }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setShowSuccess(true);
            dispatch(clearCart());
            // Optional: clean up the URL without a reload
            window.history.replaceState(null, '', '/orders');
        }
    }, [searchParams, dispatch]);

    if (!initialOrders || initialOrders.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Package size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No orders yet</h3>
                <p className="text-slate-500 mb-6">Looks like you haven't made any purchases.</p>
                <button onClick={() => router.push('/shop')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/20">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <>
            <OrderSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
            
            <div className="space-y-6">
                {initialOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
                                <p className="text-sm font-medium text-slate-600">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="flex flex-col sm:items-end gap-2">
                                <StatusBadge status={order.status} />
                                <p className="text-xl font-extrabold text-slate-800">${order.total.toFixed(2)} <span className="text-xs font-medium text-slate-400 uppercase ml-1">({order.paymentMethod})</span></p>
                            </div>
                        </div>

                        {order.address && (
                            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2"><Truck size={14}/> Shipping Address</p>
                                <p className="text-sm font-semibold text-slate-700">{order.address.name}</p>
                                <p className="text-sm text-slate-500">{order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}</p>
                                <p className="text-sm text-slate-500">{order.address.country}</p>
                                <p className="text-sm text-slate-500 mt-1">Phone: {order.address.phone}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {order.orderItems.map(item => (
                                <div key={item.productId} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-100">
                                        {item.product.images && item.product.images[0] && (
                                            <Image 
                                                src={item.product.images[0]} 
                                                alt={item.product.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-700 truncate">{item.product.name}</p>
                                        <p className="text-sm text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-700">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
