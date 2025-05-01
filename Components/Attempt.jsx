
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
        tiles.push(<div className='font-mono border-3 rounded-[10px] border-gray-400 w-[50px] h-[50px] items-center flex justify-center
            bg-gray-600 shadow-2xl text-3xl pointer-events-none' key={i} style={{backgroundColor: validateGuess(i)}}>{char}</div>)
    }
    return (
        <div className='flex items-center justify-center space-x-4'>
            {tiles}
        </div>
    )
}