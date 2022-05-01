import { TextField, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function Keyboard({ letters, onChange, onEnter, onRefresh }) {
  return (
    <div className="keyboard">
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
      <Button variant="contained" color="success" onClick={onRefresh}>
        <RefreshIcon />
      </Button>
    </div>
  );
}

export default Keyboard;
