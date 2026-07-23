'use client'
import PageTitle from "@/components/PageTitle";
import { HeartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Wishlist() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            if (res.status === 401) {
                // Not authenticated
                router.push('/cart'); // Fallback signin
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setWishlistItems(data);
            }
        } catch (error) {
            console.error("Error fetching wishlist", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });

            if (res.ok) {
                toast.success("Removed from wishlist");
                fetchWishlist(); // Refresh list
            } else {
                toast.error("Failed to remove item");
            }
        } catch (error) {
            console.error("Error removing item", error);
        }
    }

    if (loading) {
        return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>
    }

    return wishlistItems.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">
            <div className="max-w-7xl mx-auto ">
                <PageTitle heading="My Wishlist" text="items you saved for later" linkText="Continue Shopping" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-slate-200 rounded-lg p-4 flex flex-col gap-4 relative group hover:shadow-lg transition-all bg-white">
                            <button 
                                onClick={() => handleRemove(item.productId)}
                                className="absolute top-4 right-4 bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors z-10"
                                title="Remove from Wishlist"
                            >
                                <Trash2Icon size={16} />
                            </button>
                            <div className="w-full h-48 bg-slate-100 flex items-center justify-center rounded-md overflow-hidden relative">
                                {item.product.images && item.product.images.length > 0 ? (
                                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-4" />
                                ) : (
                                    <HeartIcon size={40} className="text-slate-300" />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="text-xs text-slate-500 uppercase font-medium">{item.product.category}</p>
                                <h3 className="font-semibold text-slate-800 truncate">{item.product.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="font-bold text-lg">{currency}{item.product.price}</span>
                                    {item.product.mrp > item.product.price && (
                                        <span className="text-sm text-slate-400 line-through">{currency}{item.product.mrp}</span>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => router.push(`/product/${item.product.id}`)}
                                className="mt-auto w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-colors"
                            >
                                View Product
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400 flex-col gap-4">
            <HeartIcon size={64} className="text-slate-200" />
            <h1 className="text-2xl sm:text-4xl font-semibold">Your wishlist is empty</h1>
            <button 
                onClick={() => router.push('/shop')} 
                className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
            >
                Browse Products
            </button>
        </div>
    )
}
