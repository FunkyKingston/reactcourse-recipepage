import React from 'react';

import { render, screen, fireEvent } from '@testing-library/React'; // https://testing-library.com/, https://testing-library.com/docs/react-testing-library/api
import '@testing-library/jest-dom/extend-expect';
// import TestRenderer from 'react-test-renderer'; // https://reactjs.org/docs/test-renderer.html

import customRender from '../testUtils';

// Import DisplayRecipes-component to test
import DisplayRecipes from '../../components/layout/DisplayRecipes';

// Recipe data from local file to mock API call
import randomResultsLocalFile from '../../components/pages/tmpdata/randomResults'; 


test("As many like-button texts as the number of recipes that are input to DisplayRecipes", () => {
  customRender(<DisplayRecipes recipes={randomResultsLocalFile.recipes} />)
  // const elements = screen.queryAllByText(/Preparation time/);
  const elements = screen.queryAllByText("❤"); 
  // screen.debug() // debug printout for whole document
  // screen.debug(elements)

  // expect(elements).toHaveLength(randomResultsLocalFile.recipes.length);
  // better to work with static data that we know how it behaves, otherwise may e.g. compare 0 to 0 if loading mock data fails
  expect(elements).toHaveLength(12); 
})


test("No like-button texts if there are no recipes input", () => {
  customRender(<DisplayRecipes />)
  // const elements = screen.queryAllByText("❤"); // ... return an empty array ([]) if no elements match - https://testing-library.com/docs/dom-testing-library/api-queries/
  const elements = screen.queryByText("❤"); // ... return null if no elements match - what we want here
  expect(elements).toBeNull();
})

