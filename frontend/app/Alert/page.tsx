import Navbar from "../Homepage/navbar"
import EventCard from "./AlertCard"

export default function Alert() {
  return (
        <div className="relative min-h-screen bg-[#02020a] overflow-hidden ">
          <Navbar />
      <div className="w-full max-w-5xl space-y-4 flex flex-col mx-auto mt-12">
        <EventCard
          date="TODAY"
          time="17:00"
          title="1999 AO10"
          description="Every month dozens of NEAs come within 0.05 au of Earth. The following table presents the list of these forthcoming and recent close approaches, with details concerning the encounter circumstances"
        />

        <EventCard
          date="TOMORROW"
          time="10:00"
          title="2001 FO32"
          description="Every month dozens of NEAs come within 0.05 au of Earth. The following table presents the list of these forthcoming and recent close approaches, with details concerning the encounter circumstances"
          darkButton
        />



       
      </div>
    </div>
  )
}
