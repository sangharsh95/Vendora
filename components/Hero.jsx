'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className='flex flex-col-reverse xl:flex-row gap-6 my-10 mx-6 xl:mx-auto max-w-7xl animate-fade-in-up'>
            {/* --- Left / Top section ---  */}
            <div className='flex flex-col gap-6 xl:w-2/3'>
                <div className='h-[400px] sm:h-[450px] bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden shadow-sm border border-emerald-100'>
                    {/* Decorative element */}
                    <div className='absolute -top-24 -right-24 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob'></div>
                    <div className='absolute -bottom-24 -left-24 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000'></div>
                    
                    <p className='text-sm sm:text-base font-bold text-emerald-600 mb-4 tracking-widest uppercase flex items-center gap-2'>
                        <Sparkles size={16} /> Welcome to the future
                    </p>
                    <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-800 leading-tight z-10'>
                        Premium Tech <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Unleashed.</span>
                    </h1>
                    <p className='mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 font-medium max-w-md z-10 leading-relaxed'>
                        Discover our curated collection of cutting-edge gadgets and accessories. Elevate your digital lifestyle today.
                    </p>
                    <Link href="/shop" className='mt-8 sm:mt-10 self-start bg-slate-900 text-white font-semibold px-8 py-3.5 rounded-full flex items-center gap-3 hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10'>
                        Shop Now <ArrowRightIcon size={18} />
                    </Link>
                </div>
                {/* --- Categories Marquee --- */}
                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-100'>
                    <CategoriesMarquee />
                </div>
            </div>

            {/* --- Right / Bottom section ---  */}
            <div className='h-[500px] xl:h-auto xl:w-1/3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-xl group'>
                <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] opacity-10'></div>
                <div className='absolute -bottom-10 right-0 left-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent z-10'></div>
                <div className='flex items-center justify-between z-20 relative'>
                    <div className='bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20'>
                        <p className='text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-wider'>Featured Pre-order</p>
                    </div>
                </div>
                <h2 className='text-3xl sm:text-4xl font-bold text-white mt-8 leading-tight z-20 relative drop-shadow-md'>
                    Sony WH-1000XM5
                </h2>
                <p className='text-slate-300 mt-4 text-sm sm:text-base leading-relaxed z-20 relative max-w-xs'>
                    The pinnacle of noise-canceling technology is here. Secure yours before they sell out.
                </p>
                <Link href="/shop" className='mt-8 inline-flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors z-20 relative group/link'>
                    View Details <ChevronRightIcon size={20} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className='absolute bottom-[-15%] sm:bottom-[-25%] xl:bottom-[-10%] right-[-10%] w-[120%] sm:w-[80%] xl:w-[130%] group-hover:scale-105 transition-transform duration-700 ease-in-out'>
                    <Image 
                        className='w-full h-auto drop-shadow-2xl' 
                        src={assets.headphones} 
                        alt="Sony WH-1000XM5" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
