import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feedback from './Feedback.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  navLink: {
    color: "#fff",
    textDecoration: 'None'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.root}>
              <Link to="/" className={classes.navLink}>Home</Link>
              <Link to="/pics/1/feedback" className={classes.navLink}>Add Feedback</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/pics/:id/feedback">
            <Feedback />
          </Route>
          <Route path="/">
            <DefaultApp />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;

function DefaultApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}