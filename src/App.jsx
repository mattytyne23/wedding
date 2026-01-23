import { useEffect, useState } from "react";
import WeddingRSVP from "./WeddingRSVP";
import Header from "./components/Header/Header";
import WeddingDayTimeline from "./components/TImeLine/timeline";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [guestChoices, setGuestChoices] = useState({});
  const [arrayTest, setArrayTest] = useState([]);
    const [names, setNames] = useState([]);
    const [response, setResponse] = useState(null);
    const [progress, setProgress] = useState(false)
    const [numberOfGuestsOnInvite, setNumberOfGuests] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [childOnInvite, setChildrenOnInvite] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const allNames = params.getAll('name');
    const numberOfGuestsOnInvite = params.get('number');
    const childrenOnInvite = params.get('children');
    setNames(allNames);
    setNumberOfGuests(Number(numberOfGuestsOnInvite))
    setChildrenOnInvite(childrenOnInvite)
  }, []);
  const [questionTimed, showQuestionTimed] = useState(false);
  const [airmiles, setAirMiles] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [didTimerEnd, setDidTimerEnd] = useState(false);
  const [childrenAnswer, setChildrenAnswer] = useState('');
  const [RSVPSuccess, setRSVPSubmittedSuccess] = useState(null)
  const [complete, setComplete] = useState(false)
  const [dataResponses, setDataResponses] = useState()

  const handleYesResponse = () => {
    setResponse("yes")
    setProgress(true)
  }

  const handleNoResponse = () => {
    setResponse("no")
  }

  const handlePersonClick = (name) => {
    setSelectedPerson(name);
  }

  const handleAirMilesChange = (e) => {
    setAirMiles(e.target.value)
    //setComplete(true)
  }

  const allGuestsResponded =
  Object.keys(guestChoices).length === numberOfGuestsOnInvite

  useEffect(() => {
  if (allGuestsResponded) {
    setShowQuiz(true);
  }
}, [allGuestsResponded]);

  useEffect(() => {
  let timer;
  if (questionTimed) {
    timer = setTimeout(() => {
      showQuestionTimed(false); // hide the question
      setDidTimerEnd(true);
      if (childOnInvite?.length > 0){
        setChildrenAnswer('no')
      } else {
        setChildrenAnswer('no')
      }
    }, 10000); // 20 seconds
  }

  return () => clearTimeout(timer); // cleanup if unmounted
}, [questionTimed]);

const handleChildrenQuestion = (value) => {
  setChildrenAnswer(value)
}

const handleSubmit = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  let rsvpArray = Object.values(guestChoices); // ✅ convert guestChoices object to array
  rsvpArray = rsvpArray.map(obj => ({
    ...obj,
    quizAnswer: airmiles,
    children: childrenAnswer
  }));

  const payload = {
    rsvps: rsvpArray,  // array of all guest responses
  };

  try {
    const res = await fetch(`${API_URL}/api/rsvps/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rsvpArray),
    });

    if (res.ok) {
      const data = await res.json();
      setRSVPSubmittedSuccess(true)
      setDataResponses(res)
      const isAttending = rsvpArray.some(rsvp => rsvp.response === true);
      console.log(isAttending)
      if (isAttending) {
        navigate("/info");
      } else {
        navigate("/declined")
      }
    } else {
      setRSVPSubmittedSuccess(false)
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting RSVP.");
  }
};

const anyAccepted = (() => {
  if (!guestChoices) return false;      
  if (Array.isArray(guestChoices)) {
    return guestChoices.some(g => g && g.response === true);
  }
  // treat plain object (keyed) as map of guest objects
  return Object.values(guestChoices).some(g => g && g.response === true);
})();

  return (
  <div className="container">
    <div className="card">
      {(!selectedPerson && RSVPSuccess !== true) && (
        <Header
          guestName={names}
          numberOfGuests={Number(numberOfGuestsOnInvite)}
          handleYesResponse={handleYesResponse}
          handleNoResponse={handleNoResponse}
          handlePersonClick={handlePersonClick}
          guestChoices={guestChoices}
          childOnInvite={childOnInvite}
          setChildrenAnswer={handleChildrenQuestion}
        />
      )}

      {(selectedPerson && RSVPSuccess !== true) && (
        <WeddingRSVP
          name={selectedPerson}
          numberOfGuests={Number(numberOfGuestsOnInvite)}
          response={response}
          progress={progress}
          setPersonChoices={(personData) => {
            setGuestChoices((prev) => ({
              ...prev,
              [personData.name]: personData,
            }));
           setArrayTest(Object.values(guestChoices));
            setSelectedPerson(null);
          }}
          existingChoices={guestChoices[selectedPerson] || {}}
        />
      )}

{showQuiz && !didTimerEnd && anyAccepted && (
  <>
    <p>Would you like to take part in our fun quiz? Winner gets Champagne!! 🍾</p>
    <p>You will only have 20 seconds to answer once you click the button below!</p>
    <p>Good Luck!</p>

    {!questionTimed && (
      <button onClick={() => showQuestionTimed(true)}>YES!</button>
    )}
  </>
)}

{questionTimed && (
        <div className="quiz-section">
          
            <div className="quizQuestionContainer">
              <p>Since Matty & Cherie met, how many air miles have they flown?</p>
              <input
                type="number"
                value={airmiles}
                onChange={(e) => handleAirMilesChange(e)}
                className="input"
              />
            </div>


          {didTimerEnd && <p>⏰ Time’s up! Thanks for playing!</p>}
        </div>
)}
      {Object.keys(guestChoices).length === numberOfGuestsOnInvite && (
          <div className="submit-container">
            <button id="submit-rsvp" className="btn" onClick={handleSubmit}>SUBMIT RSVP</button>
          </div>
      )}

      {RSVPSuccess && (
        <><p>Thank you for responding, we cant wait to see you there!.</p><>
            <WeddingDayTimeline />
          </></>

      )}
    </div>
  </div>
);

}
