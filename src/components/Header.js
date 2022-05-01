import { AppBar, Toolbar, Typography } from '@mui/material';

function Header({ anime }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <a
          className="header-link"
          href="/"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Typography variant="h6">Wordle Rumble</Typography>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
