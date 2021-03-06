import { useState } from 'react';
import LetterBox from './LetterBox';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const Row = ({ letters = '', word, finished, emptyRow, definitions = [] }) => {
  const [openDlg, setOpenDlg] = useState(false);
  let colors = [];

  letters.split('').forEach((letter, index) => {
    let color = '';

    if (finished && !emptyRow) {
      if (letter === word[index]) {
        color = '#6aaa64';
      } else if (word.includes(letter)) {
        color = '#c9b458';
      } else {
        color = '#787c7e';
      }
    }

    colors.push(color);
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          cursor: finished ? 'pointer' : ''
        }}
        onClick={() => (finished && !emptyRow ? setOpenDlg(true) : null)}
      >
        <LetterBox letter={emptyRow ? '' : letters[0]} color={colors[0]} />
        <LetterBox letter={emptyRow ? '' : letters[1]} color={colors[1]} />
        <LetterBox letter={emptyRow ? '' : letters[2]} color={colors[2]} />
        <LetterBox letter={emptyRow ? '' : letters[3]} color={colors[3]} />
        <LetterBox letter={emptyRow ? '' : letters[4]} color={colors[4]} />
      </div>
      <Dialog open={openDlg} onClose={() => setOpenDlg(false)}>
        <DialogTitle>{letters}</DialogTitle>
        <DialogContent>
          <ul>
            {definitions.map((def, i) => (
              <li key={i}>
                <DialogContentText>{def}</DialogContentText>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDlg(false)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Row;
