import { useEffect, useState } from "react";
import WeddingRSVP from "./WeddingRSVP";
import Header from "./components/Header/Header";

export default function App() {
    const [names, setNames] = useState([]);
    const [response, setResponse] = useState(null);
    const [progress, setProgress] = useState(false)
    const [numberOfGuestsOnInvite, setNumberOfGuests] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const allNames = params.getAll('name');
    const numberOfGuestsOnInvite = params.get('number');
    setNames(allNames);
    setNumberOfGuests(Number(numberOfGuestsOnInvite))
  }, []);

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

  return (
    <div className="container">
    <div className="card">
      {!selectedPerson && (
       <Header guestName={names} numberOfGuests={Number(numberOfGuestsOnInvite)} handleYesResponse={handleYesResponse} handleNoResponse={handleNoResponse} handlePersonClick={handlePersonClick} />        
      )}
{selectedPerson && (
  <WeddingRSVP
    name={selectedPerson} // pass single name
    numberOfGuests={Number(numberOfGuestsOnInvite)}
    response={response}
    progress={progress}
  />
)}
    </div>
    </div>

  );
}
