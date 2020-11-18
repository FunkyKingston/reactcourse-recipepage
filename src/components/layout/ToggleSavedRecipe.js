import React, { useContext, useState, useEffect } from 'react';
import { SavedRecipesContext } from '../../contexts/SavedRecipesContext';
import '../../styles/Recipes.scss';


const ToggleSavedRecipe = (props) => {
  const [isSaved, setIsSaved] = useState(false); 
  
  // ISSUE: Any usage of setSavedRecipes from one component reloads all components that useContext(SavedRecipesContext); 
  // TO DO: Refactor to avoid re-rendering non-affected components. Only one RecipeBox (the one from which setSavedRecipes is called) is affected.
  const [savedRecipes, setSavedRecipes, savedRecipesIds] = useContext(SavedRecipesContext); 

  useEffect(() => {
    setIsSaved(savedRecipesIds.includes(props.recipe.id)) // setIsSaved to true if the condition is met
  }, [props.recipe.id, savedRecipesIds]) // added dependencies, though these are never changed within a particular component instance

  const toggleRecipe = (recipe) => {
    if (isSaved) {
      // console.log("recipe.id is in savedRecipesIds")
      removeRecipe(recipe.id);
    } else {
      // console.log("recipe.id is NOT in savedRecipesIds")
      saveRecipe(recipe);
    }
  }

  const saveRecipe = (recipe) => {
    setSavedRecipes([...savedRecipes, recipe]);
    setIsSaved(true);
  }
  
  const removeRecipe = (id) => {
    setSavedRecipes(savedRecipes.filter(obj => obj.id !== id))
    setIsSaved(false);
  }

  return (
    <div className="toggle-saved-recipe">
      <button data-saved={isSaved} name="saveBtn" style={{"fontSize": props.iconFontSize ? props.iconFontSize : "1rem"}} onClick={toggleRecipe.bind(this, props.recipe)}>❤</button>
    </div>
  )
}

export default ToggleSavedRecipe;