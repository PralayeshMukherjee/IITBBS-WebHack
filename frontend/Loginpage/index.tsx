import bglog from '../public/bglog.png'
import Image from 'next/image'

export const meta = () => ([
    { title: 'login' },
    { name: 'description', content: 'Log into your account' },
])

const LoginPage = () => {
   


   
    return ( 
        <>
            <div className='flex justify-center min-h-screen z-0 bg-gray-900 text-white'>
                <Image
                   src= {bglog}
                   alt="Background Image"
                   className=" h-[35vw] w-[30vw] opacity-100 pb-43 left-0 z-2"
                   />
            <section className=" z-1  w-[30%]  shadow-lg inset-shadow-sm inset-shadow-neutral-500 absolute top-[56%] left-[20%] translate-x-1/2 -translate-y-1/2 bg-neutral-500 bg-[url(../public/images/sky.jpg)] bg-blend-multiply bg-opacity-60 bg-fixed rounded-lg p-8 flex flex-col items-center gap-6 mr-[20%]">
                    <div className="flex flex-col items-center gap-2  text-center  ">
                       
                        <h2 className='text-2xl font-mono '>Get Started</h2>
                        <p className='text-sm text-gray-300 border-b-2 font-mono'>Sign in to your account</p>
                    </div>

                    <div className="w-full">
                        <p className='text-sm font-mono '>User Name</p>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border-b-2  text-white  hover:cursor-pointer hover:border-b-gray-700"
                            
                        />

                    </div>
                      <div className="w-full">
                        <p className='text-sm font-mono '>Password</p>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2  border-b-2 text-white hover:cursor-pointer hover:border-b-gray-700"
                            
                        />
                        </div>
                        <div>
                        <button type="button" className="text-white bg-linear-to-r from-grey-500 via-grey-600 to-grey-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-grey-300 dark:focus:ring-grey-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-grey-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 mr-2">B</button>
                        <button type="button" className="text-white bg-linear-to-r from-grey-500 via-grey-600 to-grey-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-grey-300 dark:focus:ring-grey-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-grey-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 mr-2">B</button>
                        <button type="button" className="text-white bg-linear-to-r from-grey-500 via-grey-600 to-grey-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-grey-300 dark:focus:ring-grey-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-grey-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 mr-2">B</button>
                        </div>

                </section>
                </div>
        </>
    )
}

export default LoginPage;
