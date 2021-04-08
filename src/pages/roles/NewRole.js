import React, {PureComponent} from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import { createRole } from '../../actions/roles';

import s from '../profile/Profile.module.scss';

class NewRole extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
  };

  static meta = {
    name: 'Create new role',
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  changeName = (event) => {
    //console.log(event.target.value);
    this.setState({name: event.target.value});
  }

  doCreateRole = (e) => {
    this.props
      .dispatch(
        createRole({
          name: this.state.name,
        }),
      )
      .then(() =>
        this.setState({
          name: '',
        }),
      );
    e.preventDefault();
  }

  onSubmit(e) { 
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Role</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Role</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <h5>
                  Add Role <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.doCreateRole}>
              {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input bsSize="lg" type="text" name="name" id="input-name"  value={this.state.name}
                    required
                    onChange={this.changeName}/>
                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                  <ButtonGroup className="pull-right">
                  <Link to="/app/roles">
                    <Button to="/app/roles" className="ml-sm" color="default">Cancel</Button>
                    </Link>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Creating...' : 'Create'}
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
       isFetching: state.roles.isFetching,
       message: state.roles.message,
    };
  }
export default connect(mapStateToProps)(NewRole);
