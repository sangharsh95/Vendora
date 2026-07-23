'use client'
import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrderSuccessModal = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white text-center p-10 relative">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500 animate-bounce" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
                    Order Placed!
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Thank you for shopping with Vendora Your order has been successfully placed and is being processed.
                </p>

                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => {
                            onClose();
                            router.push('/shop');
                        }}
                        className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                    >
                        Keep Shopping
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-emerald-500/30"
                    >
                        <ShoppingBag size={18} /> My Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
