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
                   className=" h-[35vw] w-[30vw] opacity-100 top-0 left-0 z-2 "
                   />
            <section className=" z-1  w-[30%]  shadow-lg shadow-grey-50 absolute top-[56%] left-[20%] translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 rounded-lg p-8 flex flex-col items-center gap-6 mr-[20%]">
                    <div className="flex flex-col items-center gap-2  text-center ">
                       
                        <h2 className=''>Log In </h2>
                         <h1>Welcome</h1>

                    </div>
                    <div>
                      (
                            <button className="animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) 
                    </div>
                </section>
                </div>
        </>
    )
}

export default LoginPage;
