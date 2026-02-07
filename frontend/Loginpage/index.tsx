'use client'

import Image from 'next/image'
import type { FC } from 'react'
import astronaut from '@/public/bglog.png'
import space from '@/public/images/bg.jpg'
import { useEffect, useState } from 'react'

export const metadata = {
  title: 'login',
  description: 'Log into your account',
}

const LoginPage: FC = () => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060b1a] text-white flex items-center justify-center px-6">
      
      {isClient && (
        <>
          <div className="stars" />
          <div className="stars2" />
          <div className="stars3" />
        </>
      )}
      <div className="absolute inset-0 z-0">
        <Image
          src={space}
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="absolute bottom-4 -top-21 transform -translate-x-1/2 sm:-top-26 left-[60%] z-20">
          <Image
            src={astronaut}
            alt="astronaut"
            className="w-40 sm:w-48 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            priority
          />
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-2xl border border-white/10 pt-16 mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-mono tracking-wide">Get Started</h2>
            <p className="text-sm text-gray-300 mt-1 border-b border-white/20 inline-block pb-1">
              Sign in to your account
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-mono block mb-1">User Name</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-transparent border-b border-white/30 px-2 py-2 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-sm font-mono block mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border-b border-white/30 px-2 py-2 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            {['B', 'B', 'B'].map((label, i) => (
              <button
                key={i}
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition shadow-[0_0_15px_rgba(0,150,255,0.4)]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stars,
        .stars2,
        .stars3 {
          position: absolute;
          width: 1px;
          height: 1px;
          background: transparent;
          animation: animStar linear infinite;
        }

        .stars {
          box-shadow: ${isClient ? generateStars(200, '1') : 'none'};
          animation-duration: 50s;
        }

        .stars2 {
          box-shadow: ${isClient ? generateStars(150, '0.6') : 'none'};
          animation-duration: 100s;
        }

        .stars3 {
          box-shadow: ${isClient ? generateStars(100, '0.3') : 'none'};
          animation-duration: 150s;
        }

        @keyframes animStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  )
}

export default LoginPage

function generateStars(count: number, opacity: string): string {
  return Array.from({ length: count })
    .map(
      () =>
        `${Math.random() * 2000}px ${Math.random() * 2000}px rgba(255,255,255,${opacity})`
    )
    .join(',')
}