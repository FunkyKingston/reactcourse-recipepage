import React, { Component } from 'react';
// import '../../styles/Footer.scss'; // enough to import via App.scss

import foot from '../../img/montyfoot.png'; // Tell webpack that the current file uses this image


class Footer extends Component {
  render() {

    return (
      <footer>
        <div className="footer-container">
          <a href="https://www.montypython.com/landing/"><img src={foot} alt="Monty" width="50" /></a>
        </div>
      </footer>
    )
  }
}

export default Footer;
