import Attempt from "./Attempt";
import './../styles/GameBox.css'
import { useEffect, useState } from "react";

export default function GameBox({ word }) {

    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState(new Array(6).fill(null));
    const [submittedList, setSubmittedList] = useState(new Array(6).fill(null).map(() => ({ word: "", submitted: false })));

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

        <div className="game-box">

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

        </div>

    )
    
}