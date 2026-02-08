import React from 'react'
import TimestampCard from './TimestampCard';
import Navbar from '../Homepage/navbar';

const HistoryPage = () => {
  return (
    <div className='relative min-h-screen bg-[#02020a] overflow-hidden text-amber-50'>
        <Navbar />
      <div className="max-w-4xl mx-auto bg-[#02020a] rounded-xl shadow-md p-6">
        
      
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold border-b-2 border-blue-400">History </h1>
 
        </div>

        <p className="text-sm text-gray-500 mb-4">
        your search history. 
        </p>
 <div className="space-y-4">
          <TimestampCard
            date="Dec 30, 2024"
          
           
            tasks={[
              { title: "21 Lutetia", time: "02:00" },
              { title: "24 Themis", time: "01:30" },
              { title: "951 Gaspra", time: "01:00" },
            ]}
          />
 <TimestampCard
            date="Dec 29, 2024"
       
            
           
          />

          <TimestampCard
            date="Dec 28, 2024"
           
          
           
            tasks={[
              { title: "88705 Potato", time: "02:00" },
              { title: "243 IDA", time: "01:30" },
              { title: "13579 ALLodd", time: "03:00" },
              { title: "24860 ALLeven", time: "02:15" },
            ]}
          />
        </div>

        </div>
    </div>
     
  
  )
}

export default HistoryPage;