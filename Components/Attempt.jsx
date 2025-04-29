
import './../styles/Attempt.css'
export default function Attempt( { guess, word, submitted } ) {
    const tiles = [];
    function validateGuess(i) {

        if (submitted) {

        if (guess[i] === word[i]) {
            return 'green'
        } else if (word.includes(guess[i])) {
            return 'orange'
        } else {
            return 'gray'
        }

        }
           
    }

    for (let i = 0; i < 5; i++) {
        const char = guess[i];
        tiles.push(<div className='tile' key={i} style={{backgroundColor: validateGuess(i)}}>{char}</div>)
    }
    return (
        <div className='row'>
            {tiles}
        </div>
    )
}