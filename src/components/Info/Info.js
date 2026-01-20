import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import Details from "../Details/Details";

export default function Info() {
  const [rsvp, setRsvp] = useState(null);
  const [error, setError] = useState(null);

  const events = [
    { time: "12pm", title: "Guest Arrival", description: "Bar to open" },
    { time: "1pm", title: "Ceremony", description: "Take your seats" },
    { time: "1:30pm", title: "Drinks Reception" },
    { time: "3pm", title: "Guest Check-in", description: "(If you have a room booked)" },
    { time: "3:15pm", title: "Speeches", description: "Make your way to your table, in the Coachouse" },
    { time: "3:45pm", title: "Wedding Breakfast" },
    { time: "6:30pm", title: "Evening Reception" },
    { time: "7pm", title: "Evening guests to arrive" },
    { time: "8pm", title: "Cake cutting and First Dance + Band Peformance" },
    { time: "9pm", title: "Evening food", description: "Wood Fired Pizza" },
    { time: "12am", title: "Taxi!" }
  ];



  return (
    <div className="container">
      <div className="card">
        <div className="max-w-md mx-auto px-4 py-6">
            <h2 className="mb-4 text-center">
              Thank you  for letting us know your plans!
            </h2><hr/>
                    <Details/>
          <p>If you need to contact us on anything regarding the day, please reach out.</p>
          <b>
            <p>
              There is accommodation at the venue, if that would suit your plans,
              please reach out.
            </p>
          </b>
          <br/>

          <h3>
            Order of the day:
          </h3>
          <hr/>
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
                    {event.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}