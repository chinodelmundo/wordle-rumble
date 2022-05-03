import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide
} from '@mui/material';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header({ anime }) {
  return (
    <HideOnScroll>
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
    </HideOnScroll>
  );
}

export default Header;
