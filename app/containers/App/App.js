/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import EasyAppDescPage from 'containers/EasyAppDescPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';


const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - Easy App Desc"
      defaultTitle="Easy App Desc"
    >
      <meta name="description" content="Help you upload you app to google play store and help you with the google console" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={EasyAppDescPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
