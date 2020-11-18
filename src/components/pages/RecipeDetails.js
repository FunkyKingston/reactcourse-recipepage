import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import ToggleSavedRecipe from '../layout/ToggleSavedRecipe';

// import '../../styles/Recipes.scss'; // enough to import via App.scss


const RecipeDetailsView = ({recipeDetails}) => {
  return (
    <Fragment>
      <div className="section-line">
        <span className="section-header">{recipeDetails.title.toUpperCase()}</span> 
      </div>

      <div className="recipe-details">
        <div id="flex-row-space-between">
          <img src={recipeDetails.image} alt={recipeDetails.title} />
          <ToggleSavedRecipe recipe={recipeDetails} iconFontSize={"2.00rem"} />
        </div>
        <p>Preparation time: {recipeDetails.readyInMinutes} min</p>

        {/* <ToggleSavedRecipe recipe={recipeDetails} iconFontSize={"1.25rem"} /> */}

        <div className="hr-div" />
        <h3>INGREDIENTS</h3>
        <ul className="ul-ingredients">
        {recipeDetails.extendedIngredients.map((item, id) => (
          <li key={id}>{item.original}</li>
        ))}
        </ul>
        
        <div className="hr-div" />
        <h3>INSTRUCTIONS</h3>
        <ul className="ul-instructions">
        {recipeDetails.analyzedInstructions[0].steps.map(item => (
          <li key={item.number}>{item.step}</li>
        ))}
        </ul>
      </div>
    </Fragment>
  )
};


// About passing props via react-router-dom <Link>, used here from RecipeBox.js to RecipeDetails.js
// - overview about how to use <Link>: https://www.youtube.com/watch?v=2drsTBFZTQE
// - solution for passing custom props: https://ui.dev/react-router-v4-pass-props-to-link/
const RecipeDetails = (props) => {
  // recipeDetails has the same object structure as recipe - a different variable name is used within this component
  const [recipeDetails, setRecipeDetails] = useState({}); 
  
  const fetchRecipeData = async (id) => {
    // console.log("fetch data for recipe with id:" + id)
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/' + id + '/information?apiKey=387b90edbc994cde8a4727bb7a6be041')
      if (response.status === 200) {
        setRecipeDetails(response.data)
      }
    } 
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let mounted = true;

    // checks if props.location.state.recipe is defined, without breaking if props.location.state is undefined
    if (props.location.state && props.location.state.recipe ) { 
      if (mounted) {
        setRecipeDetails(props.location.state.recipe); 
      }
    }
    else { // !props.location.state - i.e. there is no props.location.state.recipe data available (e.g. when entering URL in address bar)
      fetchRecipeData(props.match.params.id);
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props])

  return (
    <div className="content-area">
      { recipeDetails.title ? 
        <RecipeDetailsView recipeDetails={recipeDetails} />
      :
        ""
      }

    </div>
  )
}

export default RecipeDetails;