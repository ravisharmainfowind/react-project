import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoles,deleteRole,statusRole } from '../../actions/roles';


class RoleList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    deleteMessage:PropTypes.string,
    statusMessage:PropTypes.string,
    isFetching: PropTypes.bool,
    roles: PropTypes.array,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
    deleteMessage:null,
    statusMessage:null,
    roles:[],
  };
    constructor(props) {
        super(props);
    
        this.state = {
          roles: [],
        };

        this.doGetRole = this.doGetRole.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
      }

    async componentDidMount(){
      this.doGetRole();
    }  

    doGetRole = () => {
      try { 
        this.props
            .dispatch(
              getRoles({
                roles: this.state.roles,
              }),
            )
            .then(() =>
              this.setState({
                roles: this.props.roles,
              }),
            ); 
        }  catch (error) {
        console.log(error);
      } 
        
    }

    handleClickDelete(id){
      try { 
        this.props
            .dispatch(
              deleteRole({
                roleId: id,
              }),
            )
            .then(() =>
              this.setState({
                
              }),
              this.doGetRole()
            ); 
        }  catch (error) {
        console.log(error);
      } 
   };

   handleClickStatus(id){
    try { 
      this.props
          .dispatch(
            statusRole({
              roleId: id,
            }),
          )
          .then(() =>
            this.setState({
              
            }),
            this.doGetRole()
          ); 
      }  catch (error) {
      console.log(error);
    } 
 };

    render() {
      
      var listData = this.state.roles.data||[];
      console.log(listData.roles);
       const RoleData = listData.roles !== undefined  && listData.roles.length > 0 && listData.roles.map((role,idx) => { 
        const self = this;   
            return  <>
            <tr key={role!== undefined && role.id}>
            <td scope="row" key={idx+1}>{idx+1}</td>
            <td>{role!== undefined && role.name}</td>
            <td>{role!== undefined && role.status === 1 ? <Badge color="gray" className="text-gray-light" key={idx+3} id={role.id} value={role.id} onClick={() => self.handleClickStatus(role.id)} pill>Active</Badge> : <Badge color="gray" className="text-gray-light" key={idx+4} id={role.id} value={role.id} onClick={() => self.handleClickStatus(role.id)} pill>Unactive</Badge> }</td>
            <td> 
                {/* <Link to={'/role/edit/'+role.id} className="btn btn-primary"> Edit </Link>    */}
                {/* <button className="btn btn-primary" onClick={() => self.handleClickEdit(role.id)}>Edit</button>/
                <button className="btn btn-danger" key={idx+2} id={role.id} value={role.id} onClick={() => self.handleClickDelete(employee.id)}>Delete</button> */}
                 <Link to={'roles/'+role.id}>
                 <Button outline color="warning" className="width-100 mb-xs mr-xs">Edit</Button>
                 </Link>
                 <Button outline color="danger" key={idx+2} id={role.id} value={role.id} className="width-100 mb-xs mr-xs" onClick={() => self.handleClickDelete(role.id)}>Delete</Button>
            </td> 
            </tr>
            </>;   
         });

        return (
        <div>
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Role Table</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Roles - <span className="fw-semi-bold">Basic</span></h1>
        
        <div className="">
        <Row>
          <Col lg={12}>
          {this.props.deleteMessage && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.deleteMessage}
                  </Alert>
                )}
          {this.props.statusMessage && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.statusMessage}
                  </Alert>
                )}
              <h3>Role <span className="fw-semi-bold">Table</span></h3>
              <Link to="/app/roles/new">
              <Button  outline color="primary" className="btn btn-sm btn-inverse" style={{float: "right"}}>Add</Button>
              </Link>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    {RoleData}
                  </tbody>
                  {/* eslint-enable */}
                </Table>
              </div>
          </Col>
        </Row>
       </div>
     </div>
       );
    }
}

function mapStateToProps(state) {
  return {
     isFetching: state.roles.isFetching,
     message: state.roles.message,
     roles: state.roles.roles,
     role:state.roles.role,
     deleteMessage:state.roles.deleteMessage,
     statusMessage:state.roles.statusMessage, 
  };
}

export default connect(mapStateToProps)(RoleList);