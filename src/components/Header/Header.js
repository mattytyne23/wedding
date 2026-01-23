import Details from "../Details/Details";
const Header = ({guestName, numberOfGuests, handleYesResponse, handleNoResponse, handlePersonClick, guestChoices, childOnInvite, setChildrenAnswer}) => {
    if (!guestName || guestName.length === 0) {
        return <p>No names passed.</p>;
    }

    const handleChildrenQuestionS = (e) => {
        setChildrenAnswer(e.target.value);
    };

    return (
        <>
        <h1 className="heading"> {guestName} You’re Invited!</h1>
        <p>Please RSVP to celebrate our wedding with us!</p>
        <p>You will also get to choose your food choices for the Wedding Breakfast, song choice for our playlist, and attempt to win a free bottle of champagne!</p> 
    <Details/> 
        <hr/>
        <img src="shotton.jpeg" alt="shotton" />
        <hr/> 
        <div className="button-group">
            {numberOfGuests > 1 ?
                <div>
{guestName[0].split(",").map((name, index) => {
  const response = guestChoices?.[name]?.response; 

  return (
    <p
      onClick={() => handlePersonClick(name)}
      key={index}
      className={`guest-name ${
        response === true ? "done" : response === false ? "not-done" : ""
      }`}
    >
      {name}{" "}
      {response === true && <span className="checkmark">✔️</span>}
      {response === false && <span className="cross">❌</span>}
    </p>
  );
})}
            {childOnInvite === 'yes' && (
                <>
                <h4>All children will have the same food choices</h4><h4>Chicken Goujons, Fries, Peas</h4>
                <label for="children">Will your child/children be attending?</label>
                <select onChange={handleChildrenQuestionS}>
                    <option value="">Select an option</option>
                    <option value="all">Yes, all</option>
                    <option value="yes-one">Yes, just one</option>
                    <option value="no">No</option>
                </select>
                </>
            )}

                </div>
            : <>
            {guestName[0].split(",").map((name, index) => {
              const response = guestChoices?.[name]?.response; 
              console.log(guestChoices)
              return (
                <p
                  onClick={() => handlePersonClick(name)}
                  key={index}
                  className={`guest-name ${
                    response === true ? "done" : response === false ? "not-done" : ""
                  }`}
                >
                  {response === true ? "done" : response === false ? "CONFIRMED" : "CLICK TO RSVP"}
                </p>
              );
            })}
            
            </>}

        </div> 
        </>
    )
}

export default Header;