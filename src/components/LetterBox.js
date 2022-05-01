import { Typography } from '@mui/material';

const LetterBox = ({ letter, color }) => {
  const style = {
    backgroundColor: color ? color : '',
    color: color ? 'white' : '',
    border: '1pt #787c7e solid',
    padding: '0.3rem 0.3rem',
    minWidth: '1.5rem',
    textAlign: 'center',
    borderRadius: '0.2rem'
  };
  return (
    <div style={style}>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: '600' }}>
        {letter ? letter : '\u00A0'}
      </Typography>
    </div>
  );
};

export default LetterBox;
