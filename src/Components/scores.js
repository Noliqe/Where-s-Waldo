const Scores = (props) => {

    return (
        <div className='scores'>
            <p>{props.username}</p>
            <p>{props.score} seconds</p>
        </div>
    );
    };
            
export default Scores;