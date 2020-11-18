import React from 'react';
import { render, screen, fireEvent } from '@testing-library/React';
import customRender from '../testUtils';
import RecipeDetails from '../../components/pages/RecipeDetails';
import SavedRecipes from '../../components/pages/SavedRecipes';

// Recipe data from local file to mock API call
import randomResultsLocalFile from '../../components/pages/tmpdata/randomResults'; 

// RecipeDetails receives recipe prop is received via the <Link>, as props.location.state.recipe. It also requires props.match.params.id
const recipe = randomResultsLocalFile.recipes[2];
let location = { state: {recipe: recipe}}
let match = { params: {id: location.state.recipe.id}}


test("RecipeDetails displays Ingredients and Instructions", () => {  
  customRender(<RecipeDetails location={location} match={match} />)
  const ingredientsElement = screen.queryByText("INGREDIENTS");
  expect(ingredientsElement).not.toBeNull();
  const instructionsElement = screen.queryByText("INSTRUCTIONS");
  expect(instructionsElement).not.toBeNull();
})

// An alternative way to pass "location props": 
// - https://github.com/StefanZetterberg/ReactExam/blob/main/src/Channel/ChannelProgramList.js
// - https://github.com/StefanZetterberg/ReactExam/blob/main/src/Channel/ChannelProgramList.test.js
// -> EXAMPLE TEST) uses <Router> with history provided and locationProps passed in such a way. 
//    Params are received by useParams() in the tested component - but! how does history.push() to "/" actually give the id param of /channel/:id ??
// function rendererChannelProgramList(
//   showPics,
//   props,
//   locationProps
// ) {
//   history.push("/", locationProps)
//   render(
//     <Router history={history} forceRefresh={true}>
//       <MyContext.Provider value={{ showPics }}>
//         <ChannelProgramList
//           program={props}
//         />
//       </MyContext.Provider>
//     </Router>
//   );
// }


test("RecipeDetails displays the recipe title as header", () => {
  customRender(<RecipeDetails location={location} match={match} />)
  const headerElement = screen.queryByText("AUTHENTIC MEXICAN WEDDING COOKIES");
  expect(headerElement).not.toBeNull();
})


// Integration test, impact of changes in RecipeDetailscomponent on SavedRecipes component
// * NOTE: getByRole* is the #1 priority query! (compared to e.g. getByText*) - https://testing-library.com/docs/guide-which-query/
test("Check that save button leads to desired outcome - saved recipe displayed in SavedRecipes.js", async () => {
  // customRender(<RecipeDetails location={location} match={match} />)
  customRender(<><RecipeDetails location={location} match={match} /><SavedRecipes /></>)
  // const element = screen.getByRole('RecipeDetailsView') // -> error, can't get React component like that. Printout of "accessible roles"! - those at https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles
  // const img = screen.getByRole('img') // "img" is an accessible role! Passes

  const btn = screen.getByRole('button') 
  // const btn = screen.getByRole('button', {name: "saveBtn"})
  // screen.debug(btn);
  // console.log(btn.innerHTML) // -> ❤


  // * TO DO: Go back and read through this kind of stuff to learn details and best practices: https://testing-library.com/docs/guide-events
  // btn.click() // changes data-saved attribute to "true", and thus the css should color the ❤ as rgb(243,92,114); 
  fireEvent.click(btn); // alternative to btn.click() from React Testing Library
  // screen.debug(btn) // observe that data-saved is indeed set to "true" (from its default "false")

  // const style = window.getComputedStyle(btn) // not really meant to check CSS, seems to get my inline style values though ...
  // console.log(style) // possible to see that font color is changed? Nope, not this way

  // * NOTE: The below rendering of <SavedRecipes /> doesn't work. However, rendering it together with <RecipeDetails /> 
  //         at the first line of this test actually makes it behave as expected and seems to work (is that approach shady in some way?).
  //         - I guess to be in the scope that is affected by the fired Event, it must already be rendered beforehand!
  // customRender(<SavedRecipes />) // appends to the end of screen (/document.body), the previously rendered RecipeDetails is still there too
  // screen.debug() // even though the btn element was clicked, there is no recipe shown in SavedRecipes -> see the NOTE on lines 75-77


  const imgs = screen.getAllByRole('img')
  // const imgs = await screen.findAllByRole('img')
  // screen.debug(imgs)

  expect(imgs).toHaveLength(2); // images are displayed on 1. RecipeDetails page, and - after the button click - 2. SavedRecipes child-component RecipeBox
  
})


