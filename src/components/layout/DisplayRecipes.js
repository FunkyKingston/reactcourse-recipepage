import React from 'react';
import RecipeBox from './RecipeBox';

const DisplayRecipes = ({recipes}) => {

  return (
    <div className="recipes-grid">
      { recipes && recipes.length !== 0 ?
        recipes.map(recipe => (
          <RecipeBox recipe={recipe} key={recipe.id} />
        ))
      :
        ""
      }
    </div>
  )
}

export default DisplayRecipes;