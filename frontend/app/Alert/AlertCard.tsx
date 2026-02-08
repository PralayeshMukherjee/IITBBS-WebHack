type EventCardProps = {
  date: string
  time: string
  title: string
  description: string
  darkButton?: boolean
}

export default function AlertCard({
  date,
  time,
  title,
  description,
  darkButton = false,
}: EventCardProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-xl p-6 shadow-sm text-amber-50 shadow-blue-600">
      {/* Left Date Box */}
      <div className="flex items-center gap-6">
        <div className="w-28 h-20 rounded-lg bg-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-gray-500 font-semibold">{date}</span>
          <span className="text-xl font-bold text-gray-800">{time}</span>
        </div>

        {/* Event Info */}
        <div>
          <h2 className="text-lg font-semibold text-blue-200">
            {title}
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mt-1">
            {description}
          </p>
        </div>
      </div>


    </div>
  )
}
