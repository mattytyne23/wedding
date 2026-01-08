import { Clock } from "lucide-react";

export default function WeddingDayTimeline() {
  const events = [
    { time: "13:00", title: "Ceremony Begins", description: "Please take your seats" },
    { time: "14:00", title: "Drinks Reception", description: "Canapés & welcome drinks" },
    { time: "16:00", title: "Wedding Breakfast", description: "Speeches included" },
    { time: "19:00", title: "Band Starts", description: "First dance & party" },
    { time: "23:30", title: "Last Orders", description: "Bar closes shortly" },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Wedding Day Timeline</h2>

      <div className="relative border-l-2 border-gray-300">
        {events.map((event, index) => (
          <div key={index} className="mb-8 ml-6">
            <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shadow">
              <Clock className="w-3 h-3" />
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="p-4">
                <p className="text-sm font-medium text-gray-500">{event.time}</p>
                <h3 className="text-base font-semibold mt-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
