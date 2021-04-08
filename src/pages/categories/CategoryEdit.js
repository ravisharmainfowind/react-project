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
import { updateCategory, getCategoryName,fetchCategory } from '../../actions/categories';
import { IMAGE_BASE_URL } from '../../constants/index';
import s from '../profile/Profile.module.scss';

class CategoryEdit extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
    categoryName: PropTypes.object,
    categoryEditData:PropTypes.object,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
    categoryName:{},
    categoryEditData:{},
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image:'',
      image_icon:'',
      parent_id:'',
      input: {
        // name:'',
        // image:'',
        // image_icon:'',
        // parent_id:'',
      },
      formData: {},
      errors: {},
      categoryName: {},
      categoryEditData:{},
      id : this.props.match.params.id
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    var id = this.state.id;
     this.doEditCategory();
     this.doGetCategoryName();
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

  doEditCategory = () => {
    try { 
      this.props
          .dispatch(
            fetchCategory({
              categoryId: this.state.id,
            }),
          )
          .then(() =>
            this.setState({   
             name: this.props.categoryEditData.name,
             image: this.props.categoryEditData.image,
             image_icon: this.props.categoryEditData.image_icon,
             parent_id: this.props.categoryEditData.parent_id,
            }),
          ); 
          let input = {};
            input["name"] = this.state.name;
            input["image"] = this.state.image;
            input["image_icon"] = this.state.image_icon;
            input["parent_id"] = this.state.parent_id; 
            this.setState({input:input});
      }catch (error) {
      console.log(error);
    } 
    //console.log(this.state.categoryEditData);  
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

  doUpdateCategory = (e) => {
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
      //console.log('@@@@@@@@@@@@@@@@@@@@@@@@', formData.values())  
    this.props
      .dispatch(
        updateCategory({
          name: this.state.input.name,
          image: this.state.input.image,
          image_icon: this.state.input.image_icon,
          parent_id: this.state.input.parent_id,
          id:this.state.id,
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
    // if (!input["name"]) {
    //   isValid = false;
    //   errors["name"] = "Please enter your name.";
    // }

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
         <option key={idx+1} value={category.id} selected={this.state.parent_id == category.id}>{category.name}</option>
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
                  Edit Category <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.doUpdateCategory}>
              {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-name">Name</Label>
                  <Input bsSize="lg" type="text" name="name"  value={this.state.input['name']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.name}</div>
                </FormGroup>

                <FormGroup>
                  <Label for="input-name">Image</Label>
                  <Input bsSize="lg" type="file" name="image" id="input-image"  value={this.state.input['image']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.image}</div>
                </FormGroup>

                <div>
                {this.state.image!= undefined && this.state.image !=null ? <img className="img-rounded" src={IMAGE_BASE_URL+'/category_image/'+this.state.image} alt="" height="60" />:'--'}
                </div>

                <FormGroup>
                  <Label for="input-name">Image Icon</Label>
                  <Input bsSize="lg" type="file" name="image_icon" id="input-image_icon"  value={this.state.input['image_icon']} onChange={this.handleChange}/>
                  <div className="text-danger">{this.state.errors.image_icon}</div>
                </FormGroup>
                <div>
                {this.state.image_icon!= undefined && this.state.image_icon !=null ? <img className="img-rounded" src={IMAGE_BASE_URL+'/category_image/'+this.state.image_icon} alt="" height="60" />:'--'}
                </div>

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
                      {this.props.isFetching ? 'Updating...' : 'Update'}
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
     //console.log(state.categories.categoryEditData);
    return {
       isFetching: state.categories.isFetching,
       message: state.categories.message,
       categoryName: state.categories.categoryName,
       categoryEditData:state.categories.categoryEditData,
    };
  }
export default connect(mapStateToProps)(CategoryEdit);