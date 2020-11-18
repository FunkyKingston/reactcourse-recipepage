import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Necessary setup if using webpack+babel without create-react-app: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
import { SavedRecipesProvider } from '../contexts/SavedRecipesContext';
import '../styles/App.scss';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ErrorBoundary from './common/ErrorBoundary';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Cuisines from './pages/Cuisines';
import About from './pages/About';
import SavedRecipes from './pages/SavedRecipes';


class App extends Component {

  render() {
    return(
      <SavedRecipesProvider>
        <Router>
          <div className="wrapper">
            
            <Navbar />

            <div className="content-wrapper"> 

              <Switch>
                {/* When specifying the component={} prop for Route, the component automatically gets props 'history', 'location' and 'match' */}
                {/* - E.g. <Route exact path="/test" component={About} />} />  */}
                {/* - NOTE: Also works with render={} if (props) are typed out as in <Route exact path="/test" render={(props) => <About {...props} />} /> */}                

                <Route exact path="/">
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                </Route>

                {/* The formulation below, as opposed to the other routes here, is necessary to allow to pass props to the component via a <Link> */}
                <Route exact path="/recipe/:id" render={(props) => <ErrorBoundary><RecipeDetails {...props} /></ErrorBoundary>} />
                {/* <Route exact path="/recipe/:id">
                  <ErrorBoundary>
                    <RecipeDetails />
                  </ErrorBoundary>
                </Route> */}

                <Route exact path="/cuisines">
                  <ErrorBoundary>
                    <Cuisines />
                  </ErrorBoundary>
                </Route>

                <Route exact path="/about">
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                </Route>

                <Route exact path="/savedrecipes">
                  <ErrorBoundary>
                    <SavedRecipes />
                  </ErrorBoundary>
                </Route>

              </Switch>
              

            </div>
            <Footer />

          </div>
        </Router>
      </SavedRecipesProvider>
    );
  }
}

export default App;