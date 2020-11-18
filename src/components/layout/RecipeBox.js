import React from 'react';
import { Link } from 'react-router-dom';
import ToggleSavedRecipe from './ToggleSavedRecipe';

// import '../../styles/Recipes.scss'; // enough to import via App.scss


const RecipeBox = (props) => {
  // console.log(props)
  const { image, title, readyInMinutes, id } = props.recipe;

  return (

    <div className="recipe-box">
      <div className="img-thumbnail">
        <Link to={{
          pathname: `/recipe/${id}`,
          state: {
            recipe: props.recipe,
          }
        }}>
          <img src={image} alt={title} style={{"width": "100%"}} />
        </Link>
      </div>

      <div className="recipe-box-info">
        <div>
          <Link to={{
            pathname: `/recipe/${id}`,
            state: {
              recipe: props.recipe
            }
          }}>
            <h3>{title}</h3>
          </Link>
        </div>

        <div className="hr-div" />

        <div id="flex-row-space-between">
          <div>
            <p>Preparation time: {readyInMinutes} min</p>
          </div>  
          <ToggleSavedRecipe recipe={props.recipe} iconFontSize={"1.25rem"} />
        </div>

      </div>
    </div>
    
  )
}

export default RecipeBox;