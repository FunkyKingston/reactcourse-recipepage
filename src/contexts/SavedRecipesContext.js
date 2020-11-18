import React, { useState, createContext } from 'react';


// import searchResults from '../components/pages/tmpdata/searchResults.json';


export const SavedRecipesContext = createContext();


export const SavedRecipesProvider = (props) => {
  // const [savedRecipes, setSavedRecipes] = useState(searchResults)
  const [savedRecipes, setSavedRecipes] = useState([])

  let savedRecipesIds = savedRecipes.map(obj => obj.id); 


  // TO DO: CONSIDER WHAT I WANT TO STORE IN SAVEDRECIPES, IS IT ENOUGH WITH RECIPE IDs ?
  // console.log("savedRecipes:", savedRecipes)

  
  return ( 
    // How to use react context effectively
    // - https://kentcdodds.com/blog/how-to-use-react-context-effectively
    <SavedRecipesContext.Provider value={[savedRecipes, setSavedRecipes, savedRecipesIds]}>
      {/* 
        what is props.children and when you should use it
        - https://stackoverflow.com/questions/49706823/what-is-this-props-children-and-when-you-should-use-it 
      */}
      {/* https://reactjs.org/docs/composition-vs-inheritance.html */}
      {props.children}
    </SavedRecipesContext.Provider>
  )
};

