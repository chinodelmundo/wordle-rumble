import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const Wordle = ({ word, letters, lives, definitions }) => {
  const [correct, setCorrect] = useState(false);
  const [correctRowIndex, setCorretRowIndex] = useState(999);

  useEffect(() => {
    if (letters[letters?.length - 1]?.length === 0) {
      if (letters[letters.length - 2] === word) {
        setCorrect(true);
        setCorretRowIndex(letters.length - 2);
      }
    }
    if (letters[0]?.length === 0) {
      setCorrect(false);
    }
  }, [letters, word]);

  return (
    <div
      className="wordle"
      style={{ display: 'flex', flexFlow: 'column', gap: '0.5rem' }}
    >
      {letters.map((rowLetters, index) => {
        if (lives === 0 && rowLetters.length === 0) return null;
        if (index >= 5 && index > correctRowIndex) return null;

        return (
          <Row
            letters={rowLetters}
            word={word}
            finished={index < letters.length - 1}
            emptyRow={index > correctRowIndex}
            lives={lives}
            definitions={definitions[index]}
            key={index}
          />
        );
      })}
      {letters.length < 5 &&
        Array.from({ length: 5 - letters.length }, (_, i) => <Row key={i} />)}
      {correct && (
        <div style={{ textAlign: 'center', fontSize: '3rem' }}>🏆</div>
      )}
      {!correct && lives === 0 && (
        <div style={{ textAlign: 'center', fontSize: '3rem' }}>☠️</div>
      )}
    </div>
  );
};

Wordle.propTypes = {
  word: PropTypes.string.isRequired,
  letters: PropTypes.array.isRequired,
  lives: PropTypes.number.isRequired,
  definitions: PropTypes.array.isRequired
};

export default Wordle;
