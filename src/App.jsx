import { useEffect, useState } from 'react';
import GameBox from '../Components/GameBox';

const uri = 'https://api.datamuse.com/words?sp=?????'

function App() {

  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');

  
  async function fetchWords(uri) {
    const res = await fetch(uri);
    const words = await res.json();
    return words
  }

  useEffect(() => {

    const loadData = async () => {

      const data = await fetchWords(uri)
      setWords(data)
      console.log(data)
      const word = data[Math.floor(Math.random() * data.length)].word
      setWord(word)
      console.log(word)
    
    }

    loadData();

  }, []);


  return (
    <div
    className='flex flex-col items-center justify-center'>
      <p
      className='font-semibold text-[45px] font-mono my-[10px] mx-0'>Wordle</p>
      <GameBox
      word={word}
      setWord={setWord}
      words={words}
       />
      
    </div>
  )
}

export default App
