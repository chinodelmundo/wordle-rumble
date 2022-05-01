import { Typography } from '@mui/material';

function Keyboard({ lives }) {
  return (
    <div
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        width: '100%',
        padding: '0.5rem 0',
        display: 'flex',
        gap: '0.2rem',
        justifyContent: 'center'
      }}
    >
      <Typography>Lives: </Typography>
      {Array.from({ length: lives }, (_, i) => (
        <Typography key={i}>❤️</Typography>
      ))}
    </div>
  );
}

export default Keyboard;
