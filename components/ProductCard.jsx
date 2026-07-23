'use client'
import { StarIcon, ShoppingBag, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/features/cart/cartSlice"

// Predefined array of premium pastel background colors for the images
const PASTEL_COLORS = [
    'bg-emerald-50',
    'bg-blue-50',
    'bg-amber-50',
    'bg-rose-50',
    'bg-purple-50',
    'bg-teal-50',
    'bg-cyan-50',
    'bg-orange-50',
]

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const [isWishlisted, setIsWishlisted] = useState(false)
    const { data: session } = useSession()
    const dispatch = useDispatch()

    // Deterministically pick a background color based on product ID
    const getBackgroundColor = (id) => {
        if (!id) return PASTEL_COLORS[0];
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % PASTEL_COLORS.length;
        return PASTEL_COLORS[index];
    }

    const bgColorClass = getBackgroundColor(product.id)

    const handleWishlist = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id })
            })
            if (res.status === 401) {
                toast.error("Please login to add to wishlist")
                return
            }
            if (res.ok) {
                const data = await res.json()
                setIsWishlisted(data.action === 'added')
                toast.success(data.message)
            } else {
                const errorData = await res.json().catch(() => ({}))
                toast.error(errorData.error || "Failed to update wishlist. Is your database connected?")
            }
        } catch (error) {
            console.error("Error updating wishlist:", error)
            toast.error("Network error. Please try again.")
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault()
        if (!session || !session.user) {
            toast.error("Please login to add to cart")
            return
        }
        dispatch(addToCart({ productId: product.id }))
        toast.success("Added to cart")
    }

    return (
        <Link href={`/product/${product.id}`} className='group w-full sm:w-[220px] md:w-[260px] flex flex-col'>
            {/* Colored Image Container */}
            <div className={`w-full aspect-[4/5] rounded-[2rem] ${bgColorClass} relative overflow-hidden flex items-center justify-center p-8 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-200/50 mb-5`}>
                <Image 
                    className='object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out' 
                    width={500} 
                    height={500} 
                    src={product.images[0]} 
                    alt={product.name} 
                />
                
                {/* Quick Add Button overlay */}
                <div className='absolute bottom-4 right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-300 z-10 flex flex-col gap-2'>
                    <button onClick={handleWishlist} className={`p-3 rounded-full shadow-lg transition-all flex items-center justify-center ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-slate-600 hover:text-red-500 sm:hover:scale-110'}`}>
                        <HeartIcon size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button onClick={handleAddToCart} className='bg-slate-900 text-white p-3 rounded-full hover:bg-emerald-500 hover:scale-110 transition-all shadow-lg flex items-center justify-center'>
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
            
            {/* Typography Section (Outside the box) */}
            <div className='flex flex-col gap-1 px-1'>
                <p className='text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase'>{product.category}</p>
                <h3 className='text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors'>{product.name}</h3>
                
                <div className='flex items-center gap-1 mt-1 mb-2'>
                    <div className='flex text-amber-400'>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i >= 4 ? "text-slate-300" : ""} />
                        ))}
                    </div>
                    <span className='text-xs text-slate-500 ml-1 font-medium'>(4.0)</span>
                </div>
                
                <div className='flex items-end gap-2'>
                    <p className='text-xl font-extrabold text-slate-900'>{currency}{product.price}</p>
                    {product.mrp > product.price && (
                        <p className='text-sm text-slate-400 line-through font-medium mb-0.5'>{currency}{product.mrp}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
