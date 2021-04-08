import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import CategoryList from './CategoryList';
import CategoryNew from './CategoryNew';
import CategoryEdit from './CategoryEdit';

class Categories extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/categories" exact component={CategoryList} />
        <Route path="/app/categories/new" exact component={CategoryNew} />
        <Route path="/app/categories/:id" component={CategoryEdit} />
      </Switch>
    );
  }
}

export default withRouter(Categories);