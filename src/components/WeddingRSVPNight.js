import { useState } from "react";

export default function WeddingRSVPNight({}){
      const [answer, setAnswer] = useState("");
    const handleChange = (e) => {
        console.log(e)
        setAnswer(e.target.value);
    }

    const handleSubmit = async () => {
        const API_URL = process.env.REACT_APP_API_URL;

        try {
            const res = await fetch(`${API_URL}/api/rsvps/night`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: answer,
            });
        } catch (err) {
            console.error(err);
            alert("Error submitting RSVP.");
        }
    };
    return (
                  <><div className={answer === 'yes' ? "option btn-active" : "option"}>
            <label htmlFor="yes">
                <input type="radio" id="yes" name="nightChoice" value="yes" onChange={handleChange} />
                I would love too!
            </label>
        </div><div className={answer === 'no' ? "option btn-active" : "option"}>
                <label htmlFor="no">
                    <input type="radio" id="no" name="nightChoice" value="no" onChange={handleChange} />
                    Sorry i cannot make it 
                </label>
            </div>
            
            {answer !== '' && (
            <div className="option btn-active" onClick={handleSubmit}>
                 Submit RSVP
            </div>              
            )}
            
            </>
    )
}