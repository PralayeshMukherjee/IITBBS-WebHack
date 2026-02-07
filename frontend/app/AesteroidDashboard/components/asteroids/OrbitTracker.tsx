'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Asteroid } from '@/lib/nasa-api'

interface OrbitTrackerProps {
  asteroid: Asteroid | null
}

export default function OrbitTracker({ asteroid }: OrbitTrackerProps) {
  if (!asteroid) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select an asteroid to view orbit data
      </div>
    )
  }

  // Generate simulated orbit data
  const orbitData = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    distance: asteroid.orbital_data?.aphelion_distance ? 
      (asteroid.orbital_data.aphelion_distance * (1 - Math.abs(Math.sin(i * 0.5)))).toFixed(2) :
      (100 + Math.sin(i) * 50).toFixed(2)
  }))

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={orbitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }}
          />
          <Line
            type="monotone"
            dataKey="distance"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ stroke: '#8884d8', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}