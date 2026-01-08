import { useState } from "react";
import "./WeddingRSVP.css";
import { DESSERTS, DRINKS_CHOICE, MAINS, STARTERS } from "./foodOptions";

export default function WeddingRSVP({name, numberOfGuests, response, progress, setPersonChoices, existingChoices }) {
  const [error, setError] = useState(false);
  const [song, setSong] = useState(existingChoices.song || "");
  const [starter, setStarter] = useState(existingChoices.starter || "");
  const [main, setMain] = useState(existingChoices.main || "");
  const [dessert, setDesert] = useState(existingChoices.dessert || "");
  const [allgeriesText, setAllergiesText] = useState(existingChoices.allergies || "");
  const [responseStateValue, setResponseStateValue] = useState()

const [choices, setChoices] = useState({
  response: null,
  song: "",
  drinksChoice: "",
  starter: "",
  main: "",
  dessert: "",
  allergies: false,
  allergiesText: ""
});

  const handleResponseChange = (e) => {
    if (e.target.value === 'yes'){
      setChoices((prev) => ({ ...prev, response: true }));
    } else {
      setChoices((prev) => ({ ...prev, response: false, drinksChoice: 'none', starter: 'none', main: 'none', dessert: 'none', song: 'none' }));
    } 
  }

  const handleDrinksChange = (e) => {
    setChoices((prev) => ({ ...prev, drinksChoice: e.target.value}))
  }

  const handleStarterChange = (e) => {
    setStarter(e.target.value);
    setChoices((prev) => ({ ...prev, starter: e.target.value }));
  };

  const handleMainChange = (e) => {
    setMain(e.target.value);
    setChoices((prev) => ({ ...prev, main: e.target.value }));
  }

  const handleDessertChange = (e) => {
    setDesert(e.target.value);
    setChoices((prev) => ({ ...prev, dessert: e.target.value }));
  }

  const handleAllergiesChange = (e) => {
    setAllergiesText(e.target.value);
    setChoices((prev) => ({ ...prev, allergies: e.target.value }));
  }

  const handleSongChange = (e) => {
    setSong(e.target.value)
    setChoices((prev) => ({ ...prev, song: e.target.value }));
  }

const handleFinish = () => {
  const requiredFields = ["song", "drinksChoice", "starter", "main", "dessert"];

  const emptyFields = requiredFields.filter(
    (field) => !choices[field] || choices[field].trim() === ""
  );

  if (emptyFields.length > 0) {
    setError(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    return;
  } else {
  const personOption = {
      name,
      starter,
      main,
      dessert,
      allergies: allgeriesText,
      drinksChoice: choices.drinksChoice,
      song,
      response: choices.response
    };
    console.log(personOption)
    setPersonChoices(personOption);
  }
  
};



  return (
    <>

      <h2>Will you be attending {name}?</h2>
        {error && (
          <p style={{color: 'red'}}>Please make sure all fields marked * are filled in</p>
        )} 
          <div className={choices.response ? "option btn-active" : "option"}>
            <label htmlFor="responseYes" className="full-label">
              <input
                type="radio"
                id="responseYes"
                name="response"
                value="yes"
                onChange={handleResponseChange}
              />
              YES
            </label>
          </div>


          <div className={choices.response === false ? "option btn-active" : "option"}>
            <label htmlFor="responseNo" className="full-label">
              <input type="radio" id="responseNo" name="drinksChoice" value="no" onChange={handleResponseChange}/>
               NO
            </label>
          </div>
      {choices.response && (
        <>
          <h4>Would you like a alcoholic or non-alcoholic drink for the toast and wedding breakfast?</h4>
          <div className={choices.drinksChoice === DRINKS_CHOICE[0].name ? "option btn-active" : "option"}>
            <label htmlFor="alcoholic">
            <input type="radio" id="alcoholic" name="drinksChoice" value={DRINKS_CHOICE[0].name} onChange={handleDrinksChange}/>
            {DRINKS_CHOICE[0].name}
            </label>
          </div>
          <div className={choices.drinksChoice === DRINKS_CHOICE[1].name ? "option btn-active" : "option"}>
            <label htmlFor="non-alcoholic">
            <input type="radio" id="non-alcoholic" name="drinksChoice" value={DRINKS_CHOICE[1].name} onChange={handleDrinksChange}/>
            {DRINKS_CHOICE[1].name}
            </label>
          </div>

          <h2>Food Choices</h2>
          <h3>Starters:</h3>

          <div className={choices.starter === STARTERS[0].name ? "option btn-active" : "option"}>
            <label htmlFor="chikenSalad">
            <input type="radio" id="chikenSalad" name="starter" value={STARTERS[0].name} onChange={handleStarterChange}/>
            {STARTERS[0].name}
            </label>
          </div>
          <div className={choices.starter === STARTERS[1].name ? "option btn-active" : "option"}>
            <label htmlFor="tomatoPestoPepper">
            <input type="radio" id="tomatoPestoPepper" name="starter" value={STARTERS[1].name} onChange={handleStarterChange}/>
            {STARTERS[1].name}
            </label>
          </div>
          <div className={choices.starter === STARTERS[2].name ? "option btn-active" : "option"}>
            <label htmlFor="soup">
            <input type="radio" id="soup" name="starter" value={STARTERS[2].name} onChange={handleStarterChange}/>
            {STARTERS[2].name}             
            </label>
          </div>

          <h3>Mains:</h3>

          <div className={choices.main === MAINS[0].name ? "option btn-active" : "option"}>
            <label htmlFor="mainone">
            <input type="radio" id="mainone" name="main" value={MAINS[0].name} onChange={handleMainChange}/>
            {MAINS[0].name}
            </label>
          </div>

          <div className={choices.main === MAINS[1].name ? "option btn-active" : "option"}>
            <label htmlFor="maintwo">
            <input type="radio" id="maintwo" name="main" value={MAINS[1].name} onChange={handleMainChange} />
            {MAINS[1].name}
            </label>
          </div>
          <div className={choices.main === MAINS[2].name ? "option btn-active" : "option"}>
            <label htmlFor="mainthree">
            <input type="radio" id="mainthree" name="main" value={MAINS[2].name} onChange={handleMainChange}/>
            {MAINS[2].name}
            </label>
          </div>

          <h3>Desserts:</h3>

          <div className={choices.dessert === DESSERTS[0].name ? "option btn-active" : "option"}>
            <label htmlFor="STP">
            <input type="radio" id="STP" name="dessert" value={DESSERTS[0].name} onChange={handleDessertChange}/>
            {DESSERTS[0].name}
            </label>
          </div>
          <div className={choices.dessert === DESSERTS[1].name ? "option btn-active" : "option"}>
            <label htmlFor="chcoDessert">
            <input type="radio" id="chcoDessert" name="dessert" value={DESSERTS[1].name} onChange={handleDessertChange}/>
            {DESSERTS[1].name}
            </label>
          </div>
          <div className={choices.dessert === DESSERTS[2].name ? "option btn-active" : "option"}>
            <label htmlFor="cheesecake">
            <input type="radio" id="cheesecake" name="dessert" value={DESSERTS[2].name} onChange={handleDessertChange}/>
            {DESSERTS[2].name}
            </label>
          </div> 



          <h3>Any Allergies? If not leave blank</h3>
          <textarea placeholder="" onChange={handleAllergiesChange}/>
          <br/>
          <h3>We would like you to choose a song to add to our evening playlist</h3>
          <br/>
          <input
          id="song"
          type="text"
          placeholder="Enter your choice here"
          value={song}
          onChange={(e) => handleSongChange(e)}
          required
          className="input"
          /> 
          <br/>
        </>       
      )}
        <>
          <button
            style={{marginTop: '20px'}}
            onClick={handleFinish}
            className={`btn ${!response ? "disabled" : ""}`}
          >
            Submit
          </button>


          </>
        </>
  );
}
