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
import { createCategory, getCategoryName } from '../../actions/categories';

import s from '../profile/Profile.module.scss';

class CategoryNew extends PureComponent {

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
          // name:'',
          // image:'',
          // image_icon:'',
          // parent_id:'',
      },
      formData: {},
      errors: {},
      successMessage: '',
      categoryName:{}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    this.doGetCategoryName();
  }  

  doGetCategoryName = () => {
    try { 
      this.props
          .dispatch(
            getCategoryName({
              categoryName: this.state.categoryName,
            }),
          )
          .then(() =>
            this.setState({
              categoryName: this.props.categoryName,
            }),
          ); 
      }  catch (error) {
      console.log(error);
    }  
  }

  handleChange(event) {
    console.log(event.target.value,event.target.name);
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

  doCreateCategory = (e) => {
    e.preventDefault();
    if (this.validate()) { 
        let input = {};
      input["name"] = "";
      input["image"] = "";
      input["image_icon"] = "";
      input["parent_id"] = "";
      this.setState({ input: input });

      // Create an object of formData
      const formData = new FormData();
      
      //Update the formData object
      formData.append("image", this.state.input.image);
      formData.append("name", this.state.input.name);
      formData.append("image_icon", this.state.input.image_icon);
      formData.append("parent_id", this.state.input.parent_id);
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@', formData.values())  
    this.props
      .dispatch(
        createCategory({
          name: this.state.input.name,
          image: this.state.input.image,
          image_icon: this.state.input.image_icon,
          parent_id: this.state.input.parent_id,
        }),
      )
      .then(() =>
        this.setState({
          name: '',
        }),
      );
    } 
    
  }

  validate() {

    let input = this.state.input;
    let errors = {};
    let isValid = true;
    //console.log(input["profile_image"].size);
    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Please enter category name.";
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

    if (!input["image_icon"]) {
        isValid = false;
        errors["image_icon"] = "Please select category icon image.";
      }
  
      if (typeof input["image_icon"] !== "undefined" && input["image_icon"]===null && input["image_icon"]===undefined) {
         debugger
        let imageSize = input["image_icon"].size;
        if (!input["image_icon"].name.match(/\.(jpg|jpeg|png|gif)$/)) {
          isValid = false;
          errors["image_icon"] = "Please select valid image icon(like jpg|jpeg|png|gif).";
        } else if (imageSize > 1048576) {
          isValid = false;
  
          errors["image_icon"] = "Image size less than 1 MB.";
        }
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
    var categoryNameData = this.state.categoryName.data||[];
     const CategoryData = categoryNameData.category_info != undefined  && categoryNameData.category_info.length > 0 && categoryNameData.category_info.map((category,idx) => { 
          return  <>
          <option key={idx+1} value={category.id}>{category.name}</option>
          </>;   
       });
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Category</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Category</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <h5>
                  Add Category <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.doCreateCategory} encType="multipart/form-data">
              {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input bsSize="lg" type="text" name="name"   value={this.state.input['name']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.name}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Image</Label>
                  <Input bsSize="lg" type="file" name="image" id="input-image"  value={this.state.input['image']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.image}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Image Icon</Label>
                  <Input bsSize="lg" type="file" name="image_icon" id="input-image_icon"  value={this.state.input['image_icon']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.image_icon}</div>
                </FormGroup>
                {CategoryData ?
                <FormGroup>
                    <Label for="exampleSelect">Select Parent Category</Label>
                    <Input type="select" name="parent_id" id="exampleSelect" onChange={this.handleChange}>
                    <option value="0">Select Category</option>  
                     {CategoryData}
                    </Input>
                    <div className="text-danger">{this.state.errors.parent_id}</div>
                </FormGroup>:""}

                <div className="d-flex justify-content-between align-items-center">
                  <ButtonGroup className="pull-right">
                  <Link to="/app/categories">
                    <Button to="/app/categories" className="ml-sm" color="default">Cancel</Button>
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
       isFetching: state.categories.isFetching,
       message: state.categories.message,
       categoryName:state.categories.categoryName,
    };
  }
export default connect(mapStateToProps)(CategoryNew);
