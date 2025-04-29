import { useEffect, useState } from 'react';
import './App.css'
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
    className='main'>
      <p
      className='Title'>Wordle</p>
      <GameBox
      word={word}
       />
      
    </div>
  )
}

export default App
