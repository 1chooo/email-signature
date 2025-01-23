"use client";

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ThemeToggle from "@/components/theme/theme-toggle";


const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 shadow-sm saturate-100 backdrop-blur-[10px]'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <Link href='/' aria-label='Home' title='Home'>
          <Image
            src="https://www.1chooo.com/favicon.ico"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        </Link>
        <div className='flex items-center justify-center gap-6'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
