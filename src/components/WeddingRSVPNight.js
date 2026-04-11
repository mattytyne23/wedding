import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WeddingRSVPNight({allNames}){
    const navigate = useNavigate();
    const [selectedName, setSelectedName] = useState('');
    const [song, setSongChoice] = useState('');
    const [answer, setAnswer] = useState("");
    const handleChange = (e) => {
        setAnswer(e.target.value);

    }



const handleSongChange = (e) => {
  setSongChoice(e.target.value)
}

const handleSubmit = async () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const name = allNames[0]

  //let rsvpArray = Object.values(personOption); // ✅ convert guestChoices object to array
  /*rsvpArray = rsvpArray.map(obj => ({
    ...obj,
    quizAnswer: 200,
    children: null
  }));*/

  try {
      const personOption = [{
    name,
    starter: null,
    main: null,
    dessert: null,
    allergies: null,
    drinksChoice: null,
    song: song,
    response: answer,
    }];
    const res = await fetch(`${API_URL}/api/rsvps/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personOption),
    });

    if (res.ok) {
      navigate("/success")
    } else {
      if (res.status === 409){
        window.alert('Names have already been submitted')
      }
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting RSVP.");
  }
};
    return (
                  <>
        
          <h3>We would like you to choose a song to add to our evening playlist</h3>
          <br/>
          <input
            id="songNight"
            type="text"
            placeholder="Enter your choice here"
            value={song}
            onChange={(e) => handleSongChange(e)}
            required
            className="input"
          /> 
        <div className={answer === 'yes' ? "option btn-active" : "option"}>
            <label htmlFor="yes">
                <input type="radio" id="yes" name="nightChoice" value="yes" onChange={handleChange} />
                Yes I would love too!
            </label>
        </div>


        <div className={answer === 'no' ? "option btn-active" : "option"}>
                <label htmlFor="no">
                    <input type="radio" id="no" name="nightChoice" value="no" onChange={handleChange} />
                    Sorry I cannot make it 
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