import { useEffect, useState } from "react";
import "./WeddingRSVP.css";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import Button from "./components/Button/Button";
import { DESSERTS, MAINS, STARTERS } from "./foodOptions";
import { PEOPLE } from "./nameOptions";

export default function WeddingRSVP(props) {
  const [name, setName] = useState("");
  const [song, setSong] = useState("");
  const [response, setResponse] = useState(null);
  const [drinksChoice, setDrinkChoice] = useState("");
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDesert] = useState("");
  const [allergies, setAllergiesQ] = useState("")
  const [allgeriesText, setAllergiesText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(false)

  const handleStarterChange = (e) => {
    setStarter(e.target.value);
  };

  const handleMainChange = (e) => {
    setMain(e.target.value);
  }

  const handleDessertChange = (e) => {
    setDesert(e.target.value);
  }

  const handleAllergiesChange = (e) => {
    setAllergiesText(e.target.value);
  }

  const handleYesResponse = () => {
    
    setResponse("yes")
    setProgress(true)
    
  }

  useEffect(() => {
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth'
    });
  }, [response]);

  useEffect(() => {
      console.log(props.name)
      const result = PEOPLE.find(({ name }) => name === "carl");
      console.log(result)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const rsvpData = { name, song, response, drinksChoice, starter, main, dessert, allgeriesText };
  
    try {
      const res = await fetch(`${API_URL}/api/rsvps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpData),
      });
  
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit RSVP. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting RSVP.");
    }
  };

  return (
    <div className={`${response === null ? "container" : "container container-extra"}`}>
      <div className="card">
        <Header/>

        <Details/>

        <hr/>


        <img src="shotton.jpeg" alt="shotton" />
        
        <hr/>
        <br/>

        <div className="button-group">
    <button
      type="button"
      onClick={() => handleYesResponse()}
      className={`btn ${response === "yes" ? "btn-active" : ""}`}
    >
      Accept 🎉
    </button>

    <button
      type="button"
      onClick={() => setResponse("no")}
      className={`btn ${response === "no" ? "btn-active" : ""}`}
    >
      Decline 💔
    </button>
  </div>

    <br/><br/>

        {progress && ((
          <>
          <form onSubmit={handleSubmit} className="form">

          {response === "yes" ? 
          <>
          Would you like a alcoholic or non-alcoholic drink for the toast and wedding breakfast?
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={!response}
            className={`btn ${!response ? "disabled" : ""}`}
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => setDrinkChoice('alcoholic')}
            className={`btn ${drinksChoice === "alcoholic" ? "btn-active" : ""}`}
          >
            Alcoholic
          </button>

          <button
            type="button"
            onClick={() => setDrinkChoice('non-alcoholic')}
            className={`btn ${drinksChoice === "non-alcoholic" ? "btn-active" : ""}`}
            >
              Non-alcoholic 
          </button>
          <h2>Food Choices</h2>
          <h3>Starters:</h3>

          <div className={starter === STARTERS[0].name ? "option btn-active" : "option"}>
            <input type="radio" id="chikenSalad" name="starter" value={STARTERS[0].name} onChange={handleStarterChange}/>
            <label for="chikenSalad">{STARTERS[0].name}</label>
          </div>

          <div className={starter === STARTERS[1].name ? "option btn-active" : "option"}>
            <input type="radio" id="tomatoPestoPepper" name="starter" value={STARTERS[1].name} onChange={handleStarterChange}/>
            <label for="tomatoPestoPepper">{STARTERS[1].name}</label>
          </div>

          <div className={starter === STARTERS[2].name ? "option btn-active" : "option"}>
            <input type="radio" id="soup" name="starter" value={STARTERS[2].name} onChange={handleStarterChange}/>
            <label for="soup">{STARTERS[2].name}</label>
          </div>


          <h3>Mains:</h3>

          <div className={main === MAINS[0].name ? "option btn-active" : "option"}>
            <input type="radio" id="mainone" name="main" value={MAINS[0].name} onChange={handleMainChange}/>
            <label for="mainone">{MAINS[0].name}</label>
          </div>

          <div className={main === MAINS[1].name ? "option btn-active" : "option"}>
            <input type="radio" id="maintwo" name="main" value={MAINS[1].name} onChange={handleMainChange} />
            <label for="maintwo">{MAINS[1].name}</label>
          </div>

          <div className={main === MAINS[2].name ? "option btn-active" : "option"}>
            <input type="radio" id="mainthree" name="main" value={MAINS[2].name} onChange={handleMainChange}/>
            <label for="mainthree">{MAINS[2].name}</label>
          </div>


          <h3>Desserts:</h3>

          <div className={dessert === DESSERTS[0].name ? "option btn-active" : "option"}>
            <input type="radio" id="STP" name="dessert" value={DESSERTS[0].name} onChange={handleDessertChange}/>
            <label for="STP">{DESSERTS[0].name}</label>
          </div>

          <div className={dessert === DESSERTS[1].name ? "option btn-active" : "option"}>
            <input type="radio" id="chcoDessert" name="dessert" value={DESSERTS[1].name} onChange={handleDessertChange}/>
            <label for="chcoDessert">{DESSERTS[1].name}</label>
          </div>


          <div className={dessert === DESSERTS[2].name ? "option btn-active" : "option"}>
            <input type="radio" id="cheesecake" name="dessert" value={DESSERTS[2].name} onChange={handleDessertChange}/>
            <label for="cheesecake">{DESSERTS[2].name}</label>
          </div> 
          <h3>Any Allergies?</h3>

          <button
            type="button"
            onClick={() => setAllergiesQ(true)}
            className={`btn ${allergies ? "btn-active" : ""}`}
          >
            Yes
          </button>

          <button
            type="button"
            onClick={() => setAllergiesQ(false)}
            className={`btn ${allergies === false ? "btn-active" : ""}`}
          >
            No 
          </button>
          <br/>
          {allergies && (
            <textarea placeholder="List here..." onChange={handleAllergiesChange}/>
          )}

          We would like you to choose a song to add to our evening playlist

          <input
          type="text"
          placeholder="Enter your choice here"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          required
          className="input"
          />     
          </>

          : <></>}





        </form>
          </>
        ))}

      </div>
    </div>
  );
}
