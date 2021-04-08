import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import RoleList from './RoleList';
import RoleNew from './NewRole';
import EditRole from './EditRole';

class Roles extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/roles" exact component={RoleList} />
        <Route path="/app/roles/new" exact component={RoleNew} />
        <Route path="/app/roles/:id" component={EditRole} />
      </Switch>
    );
  }
}

export default withRouter(Roles);