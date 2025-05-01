import { useEffect, useState } from "react";
import Attempt from './Attempt';
export default function GameBox({ word, words, setWord }) {

    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState(new Array(6).fill(null));
    const [submittedList, setSubmittedList] = useState(new Array(6).fill(null).map(() => ({ word: "", submitted: false })));
    
    function restartGame() {

        const word = words[Math.floor(Math.random() * words.length)].word
        setWord(word)
        console.log(word)
        setGuesses(new Array(6).fill(null))
        setCurrentGuess('')
        setSubmittedList(new Array(6).fill(null).map(() => ({ word: "", submitted: false })))
      
    }

    useEffect(() => {

        const handleType = (event) => {
            
            if (event.key === 'Enter' && currentGuess.length !== 5) {
                return;
            }
            if (event.key === 'Enter' && currentGuess.length === 5) {
                setSubmittedList((prev) => {
                    const nextGuesses = [...prev];
                    const i = nextGuesses.findIndex(guess => guess.submitted === false)
                    if (i !== -1) {
                        nextGuesses[i].word = currentGuess;
                        nextGuesses[i].submitted = true;
                    }
                    return nextGuesses
                });
                if (word === currentGuess) {
                    console.log('Game over');
                    setTimeout(() => {
                        restartGame();
                    }, 1000)
                    return;
                }

                setGuesses(prev => {
                    const nextGuesses = [...prev];
                    const i = nextGuesses.findIndex(val => val === null);
                    if (i !== -1) {
                        
                        nextGuesses[i] = currentGuess;
                        
                        
                    }
                    return nextGuesses

                })
                setCurrentGuess('');
                
            }

            else if (event.key === 'Backspace') {
                setCurrentGuess(currentGuess => currentGuess.slice(0, -1))
            } else if (currentGuess.length < 5) {
                setCurrentGuess(prevGuess => prevGuess + event.key);
            }

        }
        window.addEventListener('keydown', handleType)
        return () => window.removeEventListener('keydown', handleType)
        
    }, [currentGuess, submittedList, word]);

    return (

        <div className="flex flex-col items-center justify-center mt-[20px] space-y-[15px] ">

            {guesses.map((guess, i) => {

                const isCurrentGuessed = i === guesses.findIndex(val => val === null);

                return (

                    <Attempt
                    guess={isCurrentGuessed ? currentGuess : guess ?? ""}
                    key={i}
                    word = {word}
                    submitted = {submittedList[i].submitted}
                    />)
                    
                    
                
                })}
                <button
                className="bg-orange-400 my-8 px-10 py-3 rounded-full cursor-pointer font-mono text-2xl"
                onClick={restartGame}
                >Restart</button>
        </div>

    )
    
}