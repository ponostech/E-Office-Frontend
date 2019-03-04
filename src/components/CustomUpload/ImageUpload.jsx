import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
// core components
import Button from "components/CustomButtons/Button.jsx";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { FormControl, InputLabel } from "@material-ui/core";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    if (props.file) {
      this.state={
        file:props.file,
        imagePreviewUrl:props.imagePreviewUrl
      }
    } else {
      this.state = {
        file: null,
        imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage

      };
    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    this.props.onFileSelect(file);
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
      this.props.setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
    this.props.onRemove();
  }

  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      file,
      label
    } = this.props;

    return (
        <FormControl>
          <InputLabel htmlFor={"image"}>{label}</InputLabel>
      <div id="image" className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange.bind(this)} ref="fileInput" accept={"image/jpeg"}/>
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} alt="..."/>
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br/> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times"/> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
        </FormControl>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  onFileSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  setImagePreviewUrl:PropTypes.func,
  imagePreviewUrl:PropTypes.string,
  label:PropTypes.string
};

export default ImageUpload;
