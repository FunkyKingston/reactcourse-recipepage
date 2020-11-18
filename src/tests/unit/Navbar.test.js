import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Testing a React component that uses useContext (Kent C. Dodds - developer of react testing library, i.e. @testing-library/React)
// - https://www.youtube.com/watch?v=3yiialslPbc
import { render, screen, fireEvent } from '@testing-library/React'; // https://testing-library.com/, https://testing-library.com/docs/react-testing-library/api

// Import App Providers and Components
import { SavedRecipesProvider } from '../../contexts/SavedRecipesContext';
import Navbar from '../../components/layout/Navbar';


// Create a customRender function that by default uses all specified wrappers, as in https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }) => {
  return (
    <SavedRecipesProvider>
      <Router>
        {children}
      </Router>
    </SavedRecipesProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })


/////////////////////
// Example test(s) //
/////////////////////
it("Renders without crashing", () => {
  // Will break the test - does not work to render Navbar, due to it using 
  // 1. useContext() - <Navbar /> needs to be wrapped by the context Provider (here SavedRecipesProvider)
  // 2. <Link> - <Navbar /> also needs to be wrapped in a <Router>
  // render(<Navbar />); 

  // How to use 1 (!) wrapper - https://testing-library.com/docs/react-testing-library/api/#wrapper
  // - Still breaks the test, it also needs to be wrapped in a <Router>
  // render(<Navbar />, {wrapper: SavedRecipesProvider}); 

  // Below are three options for clearing the test:
  // 1. Adding the wrappers using JSX
  // render(<SavedRecipesProvider><Router><Navbar /></Router></SavedRecipesProvider>);
  // 2. Specifying the wrapper option, using AllTheProviders defined near the top of this file
  // render(<Navbar />, {wrapper: AllTheProviders}); 
  // 3. Using the customRender() function (defined in this file) - this approach is good as it can be re-used in multiple tests!
  // - for other test files, I make customRender available in ../testUtils.js !
  customRender(<Navbar />);
})

it("There exists an element that displays Home", () => {
  customRender(<Navbar />);
  const element = screen.queryByText("Home");
  expect(element).not.toBeNull();
})

