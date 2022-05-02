import { useState, useEffect } from 'react';
import Header from './components/Header';
import Lives from './components/Lives';
import Wordle from './components/Wordle';
import UserInput from './components/UserInput';
import WordsData from './data/WordsData';
import { Snackbar } from '@mui/material';
import './App.css';

const App = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState(['']);
  const [lives, setLives] = useState(5);
  const [openWarning, setOpenWarning] = useState(false);
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    const getRandomWords = (num) => {
      let randomWords = [];

      for (let i = 0; i < num; i++) {
        randomWords.push(
          WordsData[Math.floor(Math.random() * WordsData.length)].toUpperCase()
        );
      }

      return randomWords;
    };

    setWords(getRandomWords(5));
  }, []);

  const handleKeyPress = (event) => {
    if (lives === 0) return;

    const key = event.key;
    const rowIndex = letters.length - 1;
    const currentInput = letters[rowIndex] || '';

    if (isLetter(key)) {
      if (currentInput.length < 5) {
        const tempLetters = [...letters];
        tempLetters[rowIndex] += key.toUpperCase();
        setLetters(tempLetters);
      }
    } else if (key === 'Enter') {
      handleEnter();
    } else if (key === 'Backspace') {
      if (letters[rowIndex].length > 0) {
        let tempLetters = [...letters];
        tempLetters[rowIndex] = tempLetters[rowIndex].substring(
          0,
          tempLetters[rowIndex].length - 1
        );
        setLetters(tempLetters);
      }
    }
  };

  const handleInputChange = (value) => {
    if (lives === 0) return;

    const rowIndex = letters.length - 1;

    if (value.split('').every((x) => isLetter(x))) {
      const tempLetters = [...letters];
      tempLetters[rowIndex] = value;
      setLetters(tempLetters);
    }
  };

  const handleEnter = () => {
    const rowIndex = letters.length - 1;
    if (letters[rowIndex].length === 5) {
      let submittedWord = letters[rowIndex];

      if (WordsData.map((w) => w.toUpperCase()).includes(submittedWord)) {
        if (!words.includes(submittedWord)) {
          setLives(lives - 1);
        } else {
          setLives(lives + 2);
        }
        setLetters([...letters, '']);
        fetchDefinition(submittedWord);
      } else {
        setOpenWarning(true);
      }
    }
  };

  const handleReset = () => {
    const getRandomWords = (num) => {
      let randomWords = [];

      for (let i = 0; i < num; i++) {
        randomWords.push(
          WordsData[Math.floor(Math.random() * WordsData.length)].toUpperCase()
        );
      }

      return randomWords;
    };

    setWords(getRandomWords(5));
    setDefinitions([]);
    setLetters(['']);
    setLives(5);
  };

  const fetchDefinition = async (word) => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await fetch(url);
      const json = await response.json();
      let defs = [];

      json[0].meanings.forEach((m) => {
        m.definitions.forEach((d) => {
          defs.push(d.definition);
        });
      });

      if (definitions.length === 0) {
        setDefinitions([defs]);
      } else {
        setDefinitions([...definitions, defs]);
      }
    } catch (error) {
      console.log(error);
      if (definitions.length === 0) {
        setDefinitions([['No definition found.']]);
      } else {
        setDefinitions([...definitions, ['No definition found.']]);
      }
    }
  };

  const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
  };

  return (
    <div className="app">
      <Header />
      <Lives lives={lives} />
      <div
        className="main"
        tabIndex={-1}
        onKeyDown={(event) => handleKeyPress(event)}
      >
        <div className="wordles">
          {words.map((word, i) => (
            <Wordle
              letters={letters}
              word={word}
              lives={lives}
              definitions={definitions}
              key={i}
            />
          ))}
        </div>
      </div>
      <UserInput
        letters={letters[letters.length - 1]}
        onChange={handleInputChange}
        onEnter={handleEnter}
        onReset={handleReset}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openWarning}
        autoHideDuration={6000}
        onClose={() => setOpenWarning(false)}
        message="Not in word list!"
        sx={{ margin: '6rem auto', width: '50%' }}
      />
    </div>
  );
};

export default App;
