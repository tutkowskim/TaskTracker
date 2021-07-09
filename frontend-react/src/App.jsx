import React from 'react';
import { Container, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

import theme from './theme';
import NavBar from './NavBar';
import RouterOutlet from './RouterOutlet';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  appContent: {
    flexGrow: 1,
    flexShrink: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app}>
        <NavBar />
        <Container className={classes.appContent} maxWidth="lg">
          <RouterOutlet />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
