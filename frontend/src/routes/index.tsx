import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/trybe-projects" exact component={Dashboard} />
    <Route path="/trybe-projects/repository/:repository+" exact component={Repository} />
  </Switch>
);

export default Routes;
