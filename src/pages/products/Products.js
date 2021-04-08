import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import ProductList from './ProductList';
import ProductNew from './ProductNew';
import ProductEdit from './ProductEdit';

class Products extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/products" exact component={ProductList} />
        <Route path="/app/products/new" exact component={ProductNew} />
        <Route path="/app/products/:id" component={ProductEdit} />
      </Switch>
    );
  }
}

export default withRouter(Products);