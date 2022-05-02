import { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const UserInput = ({ letters, onChange, onEnter, onReset }) => {
  const [openDlg, setOpenDlg] = useState(false);
  const style = {
    position: 'fixed',
    top: 'auto',
    bottom: '0',
    width: '100%',
    padding: '0.5rem',
    borderTop: '1pt solid gray',
    backgroundColor: 'white',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  };

  return (
    <div style={style}>
      <TextField
        size="small"
        style={{ width: '8rem' }}
        value={letters}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        inputProps={{
          maxLength: 5,
          autoComplete: 'off',
          style: { textTransform: 'uppercase' }
        }}
      />
      <Button variant="contained" onClick={onEnter}>
        Enter
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenDlg(true)}
      >
        <RefreshIcon />
      </Button>
      <Dialog open={openDlg} onClose={() => setOpenDlg(false)}>
        <DialogContent>
          <DialogContentText>
            Game will be restarted. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDlg(false)}>No</Button>
          <Button
            onClick={() => {
              onReset();
              setOpenDlg(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInput;
