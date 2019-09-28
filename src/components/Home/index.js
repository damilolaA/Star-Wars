import React, { Component } from 'react';
import './home.scss';
import smallLogo from './images/logo-small.png';

class Home extends Component {

  render() {
    return(
      <div className="container">
        <nav className="container__navigation">
          <div>
            <img src={smallLogo} alt="" />
          </div>
          <div>
            <p>Star Wars Movies</p>
          </div>
        </nav>
        <header className="container__header">
          
        </header>
      </div>
    )
  }
}

export default Home;