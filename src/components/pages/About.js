import React from 'react';
// import '../../styles/Pages.scss'; // enough to import via App.scss

const About = () => {
  return (
    <div className="content-area">

      <div className="section-line">
        <span className="section-header">ABOUT</span>
      </div>

      <div className="about">
        <h3>React course!</h3>
        <p>
          This first version of the page is for completing a task in a React course. 
          It uses the rich <a href="https://spoonacular.com/food-api/" target="_blank" rel="noopener noreferrer">Spoonacular Food API</a>. 
          Certain elements have been "forced into" the page to satisfy examination criteria.
          Being a huge food lover with a passion for sharing and having good times together, I actually have loose plans to make a 
          complete recipes page, with the specific focus to share recipes, menus and food-related events among friends. 
          That means designing my own little API, backend, authentication, including functionality for adding recipes, creating menus, etc.
        </p>
      </div>
      
    </div>
  )
}

export default About;