import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Alert, 
  Button, 
  FormGroup, 
  Input, 
  Row,
  Col,
  Form
} from 'reactstrap';
import s from './Register.module.scss';
import Widget from '../../components/Widget';
import Footer from "../../components/Footer";
import { registerUser } from '../../actions/user';
import jwt from 'jsonwebtoken';
import config from '../../config'


class Register extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any, // eslint-disable-line
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMessage: null,
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    console.log(data.exp);
    return date < data.exp;
    
}

  constructor(props) {
    super(props);

    this.state = {
      input: {
          email : "",
          name : "",
          password : "",
          confirmPassword: ""
      },  
      errors: {},
      successMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let input = this.state.input;
    let errors = this.state.errors;

      input[event.target.name] = event.target.value;
      errors[event.target.name] = '';
      this.setState({
        input
      });
      console.log(this.state.input)

    }
  
    handleSubmit(event) {
      event.preventDefault();
    }   

    doRegister = (e) => {
    e.preventDefault();  
    if (this.validate()) {   
    this.props.dispatch(
      registerUser({
        name: this.state.input.name,
        email: this.state.input.email,
        password: this.state.input.password,
        password_confirmation: this.state.input.confirmPassword,
      }),
    );
    e.preventDefault();
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
  
    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Please enter your name.";
    }

    if(typeof input["name"] !== "undefined"){
      if(!input["name"].match(/^[a-zA-Z]+$/)){
          isValid = false;
         errors["name"] = "Only letters";
      }        
   }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof input["password"] !=null || input["password"] !=undefined) {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          if (!strongRegex.test(input["password"])) {
          isValid = false;
          errors["password"] = "Use 8 or more characters with atleast minimum of a number, symbol lowercase and uppercase letter.";
      }
   }

   if (!input["confirmPassword"]) {
    isValid = false;
    errors["confirmPassword"] = "Please enter your Confirm Password.";
  }

  if(input["password"] != input["confirmPassword"]){
    isValid = false;
    errors["confirmPassword"] = "The passwords doesn't match";
  }

    this.setState({
      errors: errors
    });
    console.log(errors)
    return isValid;
  }
  render() {
    const {from} = this.props.location.state || {
      from: {pathname: '/login'},
    };

    if (this.props.isAuthenticated) {
      // cant access login page while logged in
      return <Redirect to={from} />;
    }

    return (
      <div className={s.root}>
      <Row>
        <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} lg={{size:4, offset: 4}}>
          <p className="text-center">React Dashboard</p>
          <Widget className={s.widget}>
            <h4 className="mt-0">Register to your Web App</h4>
            
            <Form className="mt" onSubmit={this.doRegister}>
              {this.props.errorMessage && (
                <Alert size="sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="form-group">
                <Input
                  className="no-border"
                  value={this.state.name}
                  onChange={this.handleChange}
                  type="text"
                  
                  name="name"
                  placeholder="Name"
                />
                <div className="text-danger">{this.state.errors.name}</div>
              </FormGroup>
              <FormGroup className="form-group">
                <Input
                  className="no-border"
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  
                  name="email"
                  placeholder="Email"
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </FormGroup>
              <FormGroup>
                <Input
                  className="no-border"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  
                  name="password"
                  placeholder="Password"
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </FormGroup>
              <FormGroup>
                <Input
                  className="no-border"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                  
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <div className="text-danger">{this.state.errors.confirmPassword}</div>
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                {/* <a href="#" className="fs-sm">Trouble with account?</a> eslint-disable-line */}
                <Link to="/login">
                      <a className="fs-sm" color="default" size="sm">Login  
                      </a>
                  </Link>
                <div>
                  
                  <Button color="success" size="sm" type="submit">
                    {this.props.isFetching ? 'Loading...' : 'Register'}
                  </Button>
                </div>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
      <Footer className="text-center" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      isFetching: state.auth.isFetching,
      isAuthenticated: state.auth.isAuthenticated,
      errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));