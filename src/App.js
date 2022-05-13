import React from 'react';

import './public';
import Router from './Router';
import { configureReactToastify } from './init';

/**
 * Main App Component.
 */
class App extends React.Component {
  componentDidMount = () => {
    configureReactToastify();
  };

  render = () => <Router />;
}

export default App;
