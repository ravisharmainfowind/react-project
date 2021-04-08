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
import { getCategory,deleteCategory,statusCategory } from '../../actions/categories';
import { IMAGE_BASE_URL } from '../../constants/index';


class CategoryList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    deleteMessage:PropTypes.string,
    statusMessage:PropTypes.string,
    isFetching: PropTypes.bool,
    categories: PropTypes.array,
    category:PropTypes.array,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
    deleteMessage:null,
    statusMessage:null,
    categories:[],
    category:[],
  };
    constructor(props) {
        super(props);
    
        this.state = {
          categories: [],
          category:[],
        };

        this.doGetCategory = this.doGetCategory.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
      }

    async componentDidMount(){
      this.doGetCategory();
    }  

    doGetCategory = () => {
      try { 
        this.props
            .dispatch(
              getCategory({
                categories: this.state.category,
              }),
            )
            .then(() =>
              this.setState({
                categories: this.props.category,
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
              deleteCategory({
                categoryId: id,
              }),
            )
            .then(() =>
              this.setState({
                
              }),
              this.doGetCategory()
            ); 
        }  catch (error) {
        console.log(error);
      } 
   };

   handleClickStatus(id){
    try { 
      this.props
          .dispatch(
            statusCategory({
              categoryId: id,
            }),
          )
          .then(() =>
            this.setState({
              
            }),
            this.doGetCategory()
          ); 
      }  catch (error) {
      console.log(error);
    } 
 };

    render() {
      
      var listData = this.state.categories.data||[];
      console.log(listData.categories);
       const CategoryData = listData.categories !== undefined  && listData.categories.length > 0 && listData.categories.map((category,idx) => { 
        const self = this;   
            return  <>
            <tr key={category!== undefined && category.id}>
            <td scope="row" key={idx+1}>{idx+1}</td>
            <td>{category!== undefined && category.name}</td>
            <td>{category!== undefined && category.slug !==null ? category!== undefined && category.slug:'--'}</td>
            <td>{category!== undefined && category.image !==null ? <img className="img-rounded" src={IMAGE_BASE_URL+'/category_image/'+category.image} alt="" height="60" />:'--'}</td>
            <td>{category!== undefined && category.status === 1 ? <Badge color="gray" className="text-gray-light" key={idx+3} id={category.id} value={category.id} onClick={() => self.handleClickStatus(category.id)} pill>Active</Badge> : <Badge color="gray" className="text-gray-light" key={idx+4} id={category.id} value={category.id} onClick={() => self.handleClickStatus(category.id)} pill>Unactive</Badge> }</td>
            <td> 
                {/* <Link to={'/category/edit/'+category.id} className="btn btn-primary"> Edit </Link>    */}
                {/* <button className="btn btn-primary" onClick={() => self.handleClickEdit(category.id)}>Edit</button>/
                <button className="btn btn-danger" key={idx+2} id={category.id} value={category.id} onClick={() => self.handleClickDelete(employee.id)}>Delete</button> */}
                 <Link to={'categories/'+category.id}>
                 <Button outline color="warning" className="width-100 mb-xs mr-xs">Edit</Button>
                 </Link>
                 <Button outline color="danger" key={idx+2} id={category.id} value={category.id} className="width-100 mb-xs mr-xs" onClick={() => self.handleClickDelete(category.id)}>Delete</Button>
            </td> 
            </tr>
            </>;   
         });

        return (
        <div>
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Category Table</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Category - <span className="fw-semi-bold">Basic</span></h1>
        
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
              <h3>Category <span className="fw-semi-bold">Table</span></h3>
              <Link to="/app/categories/new">
              <Button  outline color="primary" className="btn btn-sm btn-inverse" style={{float: "right"}}>Add</Button>
              </Link>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    {CategoryData}
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
     isFetching: state.categories.isFetching,
     message: state.categories.message,
     categories: state.categories.categories,
     category:state.categories.category,
     deleteMessage:state.categories.deleteMessage,
     statusMessage:state.categories.statusMessage, 
  };
}

export default connect(mapStateToProps)(CategoryList);