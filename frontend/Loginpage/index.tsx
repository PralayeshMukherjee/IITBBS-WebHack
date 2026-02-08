'use client'

import Image from 'next/image'
import type { FC } from 'react'
import astronaut from '@/public/bglog.png'
import space from '@/public/images/bg.jpg'
import { useEffect, useState } from 'react'
import google from '@/public/images/google.jpg'
const LoginPage: FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-200 flex items-center justify-center px-6">

      <div className="absolute inset-0 z-0">
        <Image
          src={space}
          alt="Background"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#020617]/60 to-[#020617]" />
      </div>

      {isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="stars" />
          <div className="stars2" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        
        {/* 2. Floating Astronaut with Animation */}
        <div className="absolute -top-35 left-1/2 -translate-x-1/2 z-20">
          <Image
            src={astronaut}
            alt="astronaut"
            className="w-44 sm:w-52 drop-shadow-[0_20px_50px_rgba(0,150,255,0.3)]"
            priority
          />
        </div>

        {/* 3. Modern Glassmorphism Card */}
        <div className="relative z-10 bg-white/3 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] border border-white/10 mt-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Enter your credentials to access the station
            </p>
          </div>

          <form className="space-y-6">
            <div className="group">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2 block ml-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-slate-600"
              />
            </div>

            <div className="group">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2 block ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-slate-600"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-[0.98]">
              Sign In
            </button>
          </form>

          {/* 4. Social Logins with Modern Icons */}
          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-transparent px-4 text-xs text-slate-500 uppercase tracking-widest absolute italic">Or connect via</span>
            </div>
            
            <div className="flex justify-center gap-4">
                  <button
                  className="w-80 h-22 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between  p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group "
                >
              
                
              <Image src={google} alt="Google" className="w-20 h-20 rounded-full p-2 cursor-pointer" />
                <p className='pr-10 font-bold text-shadow-md'> Login with Google</p>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Don&apos;t have an account? <span className="text-blue-400 cursor-pointer hover:underline">Launch a new profile</span>
        </p>
      </div>

      <style jsx global>{`
        .stars, .stars2 {
          position: absolute;
          width: 1px;
          height: 1px;
          background: transparent;
        }
        .stars {
          box-shadow: ${isClient ? generateStars(700, '0.9') : 'none'};
          animation: animStar 150s linear infinite;
        }
        .stars2 {
          box-shadow: ${isClient ? generateStars(200, '0.4') : 'none'};
          animation: animStar 100s linear infinite;
        }

        @keyframes animStar {
          from { transform: translateY(0); }
          to { transform: translateY(-2000px); }
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -15px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoginPage

function generateStars(count: number, opacity: string): string {
  if (typeof window === 'undefined') return ''
  return Array.from({ length: count })
    .map(() => `${Math.random() * 2000}px ${Math.random() * 2000}px rgba(255,255,255,${opacity})`)
    .join(',')
}