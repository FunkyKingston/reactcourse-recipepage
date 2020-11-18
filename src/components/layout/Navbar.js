import React, { useContext } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SavedRecipesContext } from '../../contexts/SavedRecipesContext';

// import '../../styles/Navbar.scss'; // enough to import via App.scss
import logoImg from '../../img/logo2_cropped.png';


const Burger = (props) => {
  return (
    // TO DO: Make css media queries where the Burger button is shown and add functionality to expand a dropdown menu where links are displayed
    // <div className={props.classList} onClick={props.onToggleDropdown}> 
    <div className={props.classList}>
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
    </div>
  )
}


const Navbar = () => {
  const [savedRecipes] = useContext(SavedRecipesContext); 
  
  // let history = useHistory();
  // const redirectToSavedRecipes = () => {
  //   history.push('/savedrecipes')
  // }

  return (
    <nav>
      <div className="nav-container">

        <div className="nav-container-left">
          <img src={logoImg} className="nav-logo" alt="nav-logo" />
          <div className="nav-header">
            <Link to="/">TomasRecipes</Link>
          </div>
          
          <div className="nav-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cuisines">Cuisines</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="nav-container-right">
          <Link to="/savedrecipes">
          <div className="nav-links savedrecipes-nav">
            Saved Recipes: {savedRecipes.length}
            {/* <button className="btn" onClick={redirectToSavedRecipes}>Saved Recipes: {savedRecipes.length}</button> */}
          </div>
          </Link>
        </div>

        <Burger classList={"burger"} />

      </div>
    </nav>
  )
}

export default Navbar;