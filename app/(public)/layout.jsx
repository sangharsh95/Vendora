'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "@/lib/features/product/productSlice";

export default function PublicLayout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    dispatch(setProduct(data));
                }
            } catch (error) {
                console.error("Failed to fetch DB products:", error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
