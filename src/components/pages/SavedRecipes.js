import React, { useContext } from 'react';
import { SavedRecipesContext } from '../../contexts/SavedRecipesContext';
import DisplayRecipes from '../layout/DisplayRecipes';


const SavedRecipes = () => {
  const [savedRecipes] = useContext(SavedRecipesContext); 

  return (
    <div className="content-area">
      
      <div className="section-line">
        <span className="section-header">SAVED RECIPES</span>
      </div>
      
      <DisplayRecipes recipes={savedRecipes} />

    </div>
  )
}

export default SavedRecipes;