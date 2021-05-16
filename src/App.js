import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import NavBar from './components/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#aee571',
      main: '#7cb342',
      dark: '#4b830d',
      contrastText: '#000000'
    },
    secondary: {
      light: '#629749',
      main: '#33691e',
      dark: '#003d00',
      contrastText: '#000000'
    },
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        color: '#ffffff'
      }
    }
  }

})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
