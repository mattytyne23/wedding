import Details from "../Details/Details";
const Header = ({guestName, numberOfGuests, handleYesResponse, handleNoResponse, handlePersonClick}) => {
    if (!guestName || guestName.length === 0) {
        return <p>No names passed.</p>;
    }
    return (
        <>
        <h1 className="heading"> {guestName} You’re Invited!</h1>
        <p>Please RSVP to celebrate our wedding with us 💍</p> 
    <Details/> 
        <hr/>
        <img src="shotton.jpeg" alt="shotton" />
        <hr/> 
        <div className="button-group">
            {numberOfGuests > 1 ?
                <div>
                    {guestName[0].split(',').map((name, index) => (
                    <p  onClick={() => handlePersonClick(name)} key={index} >{name} </p>
                    ))}
                </div>
            : <><button
            type="button"
            onClick={handleYesResponse}
            className="btn"
            >
            Accept 🎉
            </button>

            <button
            type="button"
            onClick={handleNoResponse}
            className="btn"
            >
            Decline 💔
            </button></>}

        </div> 
        </>
    )
}

export default Header;