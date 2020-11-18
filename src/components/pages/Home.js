import React, { Component } from 'react';
import axios from 'axios';
import DisplayRecipes from '../layout/DisplayRecipes';

// use data from .json-file during development, since the spoonacular API has a fixed daily quota of free calls
import randomResultsLocalFile from './tmpdata/randomResults'; 
// const useApi = 1;
const useApi = 0;

class Home extends Component {
  state = {
    recipes: [],
  }
  
  // Spoonacular Food API Docs: https://spoonacular.com/food-api/docs
  fetchRandomRecipes = () => {
    axios
      .get('https://api.spoonacular.com/recipes/random?apiKey=387b90edbc994cde8a4727bb7a6be041&number=12&tags=vegetarian,dessert')
      // .get('https://api.spoonacular.com/recipes/search?apiKey=387b90edbc994cde8a4727bb7a6be041&number=12&query=' + queryText) // <- Freetext search
      .then(response => {
        // console.log("response", response)
        this.setState({ recipes: response.data.recipes })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    if (useApi) {
      this.fetchRandomRecipes();
    } else { // the spoonacular API has a fixed daily quota of free calls - use this during development
      this.setState({ recipes: randomResultsLocalFile.recipes })
    }
  }
  
  render() {
    // throw new Error('ojojoj')
   
    return (
      <div className="content-area">

        <div className="section-line">
          <span className="section-header">RANDOM RECIPES</span>
          {/* <span style={{"color": "white", "fontSize": "1.2rem", "fontWeight": "bold", "marginLeft": "auto"}} className="section-header">⟳</span> */}
        </div>

        <DisplayRecipes recipes={this.state.recipes} />

      </div>
    )
  }
}

export default Home;