import bglog from '../public/bglog.png'
import Image from 'next/image'

export const meta = () => ([
  { title: 'login' },
  { name: 'description', content: 'Log into your account' },
])

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row items-center justify-center gap-10 px-6">
      
      <div className="w-full max-w-sm lg:max-w-md">
        <Image
          src={bglog}
          alt="Background Image"
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <section className="w-full max-w-sm sm:max-w-md bg-neutral-700/70 backdrop-blur rounded-lg p-6 sm:p-8 shadow-lg flex flex-col gap-6">
        
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-mono">Get Started</h2>
          <p className="text-sm text-gray-300 border-b border-gray-400 pb-2 font-mono">
            Sign in to your account
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-mono">User Name</p>
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent border-b border-gray-400 px-2 py-2 focus:outline-none focus:border-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-mono">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-b border-gray-400 px-2 py-2 focus:outline-none focus:border-white"
          />
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition">B</button>
          <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition">B</button>
          <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition">B</button>
        </div>

      </section>
    </div>
  )
}

export default HomePage