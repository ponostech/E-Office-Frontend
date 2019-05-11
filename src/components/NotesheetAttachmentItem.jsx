import React, { Component } from "react";
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import PropTypes from "prop-types";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import path from "path";

const config = {
  bucketName: BUCKET_NAME,
  dirName: "office/notesheet", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

class NotesheetAttachmentItem extends Component {
  state = {
    id:"",
    name: "",
    dirName: "",
    file: {},
    location: "",

    loading:true
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      id:nextProps.file.id,
      name:nextProps.file.name,
      dirName:nextProps.file.dirName,
      file:nextProps.file.file,
      location:nextProps.file.location,
    })
  }

  handleItemDelete=(e)=>{
    // const file=this.state.file
    // config.dirName = this.state.dirName;
    //
    //  S3FileUpload.deleteFile(file.name,config)
    //    .then(res=>{
    //       this.props.onDelete(this.state)
    //    })
    //    .catch(err=>console.log(err))
    this.props.onDelete(this.state)
  }

  handleChange=(e)=>{
    this.setState({
      name:e.target.value
    })
    this.props.onNameChanged(e.target.value)
  }
  render() {
    return (
      <>
        <ListItem>
          <ListItemText primary={
            <TextField InputProps={{disableUnderline:true}} fullWidth={true} value={this.state.name} onChange={e=>this.setState({name:e.target.value})}  />
          }  secondary={"Size : "+Math.round(this.state.file.size / 1024) + " Kb"} color={"primary"}/>
          <ListItemSecondaryAction>
            <Tooltip title={"Click here to delete"}>
              <IconButton onClick={this.handleItemDelete.bind(this)}>
                <DeleteIcon color={"error"}/>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}

NotesheetAttachmentItem.propTypes={
  onDelete:PropTypes.func.isRequired,
  onNameChanged:PropTypes.func.isRequired,
  file:PropTypes.object.isRequired,
}

export default NotesheetAttachmentItem;