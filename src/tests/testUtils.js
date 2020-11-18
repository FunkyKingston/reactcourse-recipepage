import React from 'react';
import { render } from '@testing-library/React'; // https://testing-library.com/docs/react-testing-library/api

import { BrowserRouter as Router } from 'react-router-dom';
import { SavedRecipesProvider } from '../contexts/SavedRecipesContext';


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

export default customRender;