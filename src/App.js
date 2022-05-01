import { useState, useEffect } from 'react';
import Header from './components/Header';
import Lives from './components/Lives';
import Wordle from './components/Wordle';
import Keyboard from './components/Keyboard';
import WordsData from './data/WordsData';
import {
  Snackbar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import './App.css';

const App = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState(['']);
  const [lives, setLives] = useState(5);
  const [openWarning, setOpenWarning] = useState(false);
  const [openDlg, setOpenDlg] = useState(false);

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
    setLetters(['']);
    setLives(5);
    setOpenDlg(false);
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
            <Wordle letters={letters} word={word} lives={lives} key={i} />
          ))}
        </div>
      </div>
      <Keyboard
        letters={letters[letters.length - 1]}
        onChange={handleInputChange}
        onEnter={handleEnter}
        onRefresh={() => setOpenDlg(true)}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openWarning}
        autoHideDuration={6000}
        onClose={() => setOpenWarning(false)}
        message="Not in word list!"
        sx={{ margin: '6rem auto', width: '50%' }}
      />
      <Dialog open={openDlg} onClose={() => setOpenDlg(false)}>
        <DialogContent>
          <DialogContentText>
            Game will be restart. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDlg(false)}>No</Button>
          <Button onClick={() => handleReset()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
