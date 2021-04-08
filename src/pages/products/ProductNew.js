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
import { addProduct, getCategoryName } from '../../actions/products';

import s from '../profile/Profile.module.scss';

class ProductNew extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
    categoryName:PropTypes.object,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
    categoryName:{},
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {
         
      },
      formData: {},
      errors: {},
      successMessage: '',
      categoryName:{}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getCategoryName();
    this.setState({ categoryName : this.props.categoryName });
  }  

  handleChange(event) {  
    let input = this.state.input;
    let errors = this.state.errors;
    if (event.target.name === "image") {
      //console.log(event.target.files[0])
      input[event.target.name] = event.target.files[0];
      this.setState({
        input
      });
      //console.log(this.state.input)
    } else if (event.target.name === "image_icon") {
        //console.log(event.target.files[0])
        input[event.target.name] = event.target.files[0];
        this.setState({
          input
        });
        //console.log(this.state.input)
      } else {
      //console.log(event.target.name);
      input[event.target.name] = event.target.value;
      errors[event.target.name] = '';
      this.setState({
        input
      });
      console.log(this.state.input)

    }
  }

  changeName = (event) => {
    //console.log(event.target.value);
    this.setState({name: event.target.value});
  }

  doCreateProduct = (e) => {
    e.preventDefault();
    if (this.validate()) { 
        let input = {};
      input["title"] = "";
      input["quantity"] = "";
      input["price"] = "";
      input["sale_price"] = "";
      input["image"] = "";
      input["category_id"] = "";
      input["description"] = "";
      this.setState({ input: input });

      // Create an object of formData
      const formData = new FormData(); 
      //Update the formData object
      formData.append("image", this.state.input.image);
      formData.append("title", this.state.input.title);
      formData.append("quantity", this.state.input.quantity);
      formData.append("price", this.state.input.price);
      formData.append("sale_price", this.state.input.sale_price);
      formData.append("category_id", this.state.input.category_id); 
      formData.append("description", this.state.input.description); 
      this.props.addProduct(formData);
            // title: this.state.input.title,
            // quantity: this.state.input.quantity,
            // price: this.state.input.price,
            // sale_price: this.state.input.sale_price,
            // image: this.state.input.image,
            // category_id: this.state.input.category_id,
            // description: this.state.input.description,
        //});
    } 
    
  }

  validate() {

    let input = this.state.input;
    let errors = {};
    let isValid = true;
    //console.log(input["profile_image"].size);
    if (!input["title"]) {
      isValid = false;
      errors["title"] = "Please enter product title.";
    }

    if (!input["quantity"]) {
        isValid = false;
        errors["quantity"] = "Please enter quantity.";
    }

    if (typeof input["quantity"] !== "undefined") {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(input["quantity"])) {
          isValid = false;
          errors["quantity"] = "Please enter only number.";
        }
    }

    if (!input["price"]) {
        isValid = false;
        errors["price"] = "Please enter price.";
    }

    if (typeof input["price"] !== "undefined") {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(input["price"])) {
          isValid = false;
          errors["price"] = "Please enter only number.";
        }
    }

    if (!input["sale_price"]) {
        isValid = false;
        errors["sale_price"] = "Please enter sale price.";
    }

    if (typeof input["sale_price"] !== "undefined") {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(input["sale_price"])) {
          isValid = false;
          errors["sale_price"] = "Please enter only number.";
        }
    }

    if (!input["image"]) {
      isValid = false;
      errors["image"] = "Please select category image.";
    }

    if (typeof input["image"] !== "undefined" && input["image"]===null && input["image"]===undefined) {
       debugger
      let imageSize = input["image"].size;
      if (!input["image"].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        isValid = false;
        errors["image"] = "Please select valid image(like jpg|jpeg|png|gif).";
      } else if (imageSize > 1048576) {
        isValid = false;

        errors["image"] = "Image size less than 1 MB.";
      }
    }

    if (!input["category_id"]) {
        isValid = false;
        errors["category_id"] = "Please select category.";
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }

  onSubmit(e) { 
    e.preventDefault();
  }

  render() {
    var categoryNameData = this.state.categoryName||[];
     const CategoryData = categoryNameData != undefined  && categoryNameData.length > 0 && categoryNameData.map((category,idx) => { 
          return  <>
          <option key={idx+1} value={category.id}>{category.name}</option>
          </>;   
       });
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Product</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Product</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <h5>
                  Add Product <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.doCreateProduct} encType="multipart/form-data">
              {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-name">Title</Label>
                  <Input bsSize="lg" type="text" name="title" placeholder="Title"  value={this.state.input['title']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.title}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Quantity</Label>
                  <Input bsSize="lg" type="number" name="quantity" placeholder="Quantity" min="1" value={this.state.input['quantity']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.quantity}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Price</Label>
                  <Input bsSize="lg" type="number" name="price" min="1" placeholder="Price"  value={this.state.input['price']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.price}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Sale Price</Label>
                  <Input bsSize="lg" type="number" min="1" name="sale_price" placeholder="Sale Price" value={this.state.input['sale_price']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.sale_price}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Image</Label>
                  <Input bsSize="lg" type="file" name="image" id="input-image"  value={this.state.input['image']} onChange={this.handleChange} multiple/>
                  <div className="text-danger">{this.state.errors.image}</div>
                </FormGroup>

                {CategoryData ?
                <FormGroup>
                    <Label for="exampleSelect">Select Category</Label>
                    <Input type="select" name="category_id" id="exampleSelect" onChange={this.handleChange}>
                    <option value="0">Select Category</option>  
                     {CategoryData}
                    </Input>
                    <div className="text-danger">{this.state.errors.category_id}</div>
                </FormGroup>:""}

                <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input type="textarea" name="description" id="exampleText" value={this.state.input['description']}  onChange={this.handleChange}/>
                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                  <ButtonGroup className="pull-right">
                  <Link to="/app/products">
                    <Button to="/app/products" className="ml-sm" color="default">Cancel</Button>
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
       isFetching: state.products.isFetching,
       message: state.products.message,
       categoryName:state.products.categoryName,
    };
  }
const actionCreators = { addProduct,getCategoryName };
export default connect(mapStateToProps,actionCreators)(ProductNew);
