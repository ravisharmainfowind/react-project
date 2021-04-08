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
import { getProducts,deleteProduct,statusProduct } from '../../actions/products';

class ProductList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    deleteMessage:PropTypes.string,
    statusMessage:PropTypes.string,
    isFetching: PropTypes.bool,
    products: PropTypes.array,
    
  };

  static defaultProps = {
    isFetching: false,
    message: null,
    deleteMessage:null,
    statusMessage:null,
    products:[],
    
  };
    constructor(props) {
        super(props);
        this.state = {
          products: [],
        };

        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
      }
  
    componentDidMount = async () => {
      await this.props.getProducts();
      this.setState({ products : this.props.products });
    }

   async handleClickDelete(id){
        await this.props.deleteProduct(id);
        await this.props.getProducts();
        this.setState({ products : this.props.products });
       } 

  async handleClickStatus(id){
      await this.props.statusProduct(id);
      await this.props.getProducts();
      this.setState({ products : this.props.products }); 
   };

    render() {
      
      var listData = this.state.products||[];
       const ProductData = listData.products !== undefined  && listData.products.length > 0 && listData.products.map((product,idx) => { 
        const self = this;   
            return  <>
            <tr key={product!== undefined && product.id}>
            <td scope="row" key={idx+1}>{idx+1}</td>
            <td>{product!== undefined && product.title}</td>
            <td>{product.quantity!== undefined && product.quantity}</td>
            <td>{product.price!== undefined && product.price}</td>
            <td>{product.sale_price!== undefined && product.sale_price}</td>
            <td>{product!== undefined && product.slug !==null ? product!== undefined && product.slug:'--'}</td>
            <td>{product.status!= undefined && product.status === '1' ? <Badge color="gray" className="text-gray-light" key={idx+3} id={product.id} value={product.id} onClick={() => self.handleClickStatus(product.id)} pill>Active</Badge> : <Badge color="gray" className="text-gray-light" key={idx+4} id={product.id} value={product.id} onClick={() => self.handleClickStatus(product.id)} pill>Unactive</Badge> }</td>
            <td>
                 <Link to={'products/'+product.id}>
                 <Button outline color="warning" className="width-100 mb-xs mr-xs">Edit</Button>
                 </Link>
                 <Button outline color="danger" key={idx+2} id={product.id} value={product.id} className="width-100 mb-xs mr-xs" onClick={() => self.handleClickDelete(product.id)}>Delete</Button>
            </td> 
            </tr>
            </>;   
         });

        return (
        <div>
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Product Table</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Product - <span className="fw-semi-bold">Basic</span></h1>
        
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
              <h3>Product <span className="fw-semi-bold">Table</span></h3>
              <Link to="/app/products/new">
              <Button  outline color="primary" className="btn btn-sm btn-inverse" style={{float: "right"}}>Add</Button>
              </Link>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Qauntity</th>
                      <th>Price</th>
                      <th>Sale Price</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* eslint-disable */}
                  <tbody>
                    {ProductData}
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
     message: state.products.message,
     products: state.products.products,
     deleteMessage:state.products.deleteMessage,
     statusMessage:state.products.statusMessage, 
  };
}
const actionCreators = { getProducts,deleteProduct,statusProduct };
export default connect(mapStateToProps,actionCreators)(ProductList);

