import React from 'react';
// import ReactDOM from 'react-dom'; // We don't use ReactDOM.render() here - the render functions provided by testing libraries are developed fit for purpose
import { BrowserRouter as Router } from 'react-router-dom';

// *** TESTING REACT APPS *** - https://jestjs.io/docs/en/tutorial-react
// Jest is a testing framework created and maintained by Facebook. If you build your React application with create-react-app, you can start 
// using Jest with zero config. 
// - Use Jest (provides a "test runner") with react-test-renderer and @testing-library/react library to conduct snapshot and DOM testing.

// *** React Test Renderer *** (Used e.g. for Snapshot tests) - https://reactjs.org/docs/test-renderer.html#overview 
// - not included with create-react-app -> $ npm i react-test-renderer -D
// - "React Test Renderer is a renderer for testing React Components, which traverses a ReactElement tree and represents as a JSON object. 
//    The renderer is combined with Jest’s snapshot testing."
import TestRenderer from 'react-test-renderer'; // https://reactjs.org/docs/test-renderer.html

// *** React Testing Library *** (Used e.g. for DOM testing)
// - "introducing React Testing Library (Kent C. Dodds)" - https://kentcdodds.com/blog/introducing-the-react-testing-library
import { render, screen, fireEvent } from '@testing-library/React'; // https://testing-library.com/, https://testing-library.com/docs/react-testing-library/api
// * import userEvent from '@testing-library/user-event'; // Package specifically for testing user events - builds on top of the fireEvent API.
// * "React Testing Library re-exports everything from DOM Testing Library as well as these methods: ..." 
//   - https://testing-library.com/docs/dom-testing-library/api-queries/
//     - DOM Testing Library: https://testing-library.com/docs/dom-testing-library/api-queries

// Import About-component to test
import About from '../../components/pages/About';


///////////////////
// First example // - "Bad testing philosophy" - according to React Testing Library author
///////////////////
test("There exists a div element with className content-area", () => {
  render(<About />);
  // Getting a DOM element by className (like below) can be done with javascript, but NOT with react testing library, 
  // as it's not good testing philosophy to test implementation details - instead test the end result
  const divElement = document.getElementsByClassName("content-area"); 
  expect(divElement).not.toBeNull();
});


///////////////////////////////////////////////////////////////
// Example of React Testing Library - (super basic) DOM test // - https://www.robinwieruch.de/react-testing-library
///////////////////////////////////////////////////////////////
test("There exists an element that displays ABOUT", () => {
  render(<About />);
  // screen.debug() // debug whole document. debug() - "essentially a shortcut for console.log(prettyDOM())"
  // screen.debug(element) // debug single element

  const headerElement = screen.queryByText("ABOUT");
  expect(headerElement).not.toBeNull();
  const headerElement2 = screen.queryByText("React course!");
  expect(headerElement2).not.toBeNull();
});

// getBy vs. queryBy vs. findBy - https://testing-library.com/docs/dom-testing-library/api-queries
// - getBy* queries return the first matching node for a query, and throw an error if no elements match
// - queryBy* queries return the first matching node for a query, and return null if no elements match
// - findBy* queries return a promise which resolves when an element is found which matches the given query. 
//           The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms

////////////////////////////////////
// Example of react-test-renderer //
////////////////////////////////////
// it() vs test() - The Jest docs state "it" is an alias of "test". So they are exactly the same. - https://jestjs.io/docs/en/api.html#testname-fn-timeout
it("Matches snapshot", () => {
  const tree = TestRenderer.create(<About />).toJSON(); // -> a virtual DOM _object_
  expect(tree).toMatchSnapshot(); // tree is compared to previously saved snapshot in the __snapshots__-folder (created the first time the test runs)
});


