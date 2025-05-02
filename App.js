import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';  // লোডিং স্ক্রীন কম্পোনেন্ট
import Signup from './Signup';  // সাইন-আপ কম্পোনেন্ট

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/loading" exact component={LoadingScreen} />
        <Route path="/signup" exact component={Signup} />
        <Redirect from="/" to="/loading" />
      </Switch>
    </Router>
  );
}

export default App;
