import { Typography, useScrollTrigger } from '@mui/material';

function Keyboard({ lives }) {
  const trigger = useScrollTrigger();

  return (
    <div
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        width: '100%',
        padding: '0.5rem 0',
        display: 'flex',
        gap: '0.1rem',
        justifyContent: 'center',
        top: trigger ? '0' : ''
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
