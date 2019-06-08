import React, { Component } from "react";
import PropTypes from "prop-types";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import moment from "moment";
import {
  IconButton, InputAdornment,
  LinearProgress,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";

const inputProps = {
  step: 300,
};

var uniqid = require("uniqid");
const config = {
  bucketName: BUCKET_NAME,
  dirName: "office/notesheet-attachments", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};
class NotesheetAttachmentItem extends Component {
  state = {
    notesheet_id: "",
    name: "",
    location: "",

    file: null,
    loading: true
  };

  componentDidMount() {
    let { file,attachment } = this.props;

    if (attachment) {
      this.setState({
        name:attachment.name,
        location:attachment.location,
        loading:false
      })
    }

    if (file) {
      let blob = file.slice(0, file.size, file.type);
      let newName = "notesheet_attachment_"+Date.now() + "-" + uniqid();
      let newFile = new File([blob], newName, { type: file.type });

      let loc = moment().format("MM-YYYY");
      // config.dirName=`office/notesheet-attachments/${loc}/`;

      this.setState({ file: newFile });

      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          this.setState({
            name: file.name,
            location: data.location,
            loading: false
          });
          this.props.addItem({name:file.name,location:data.location})
        })
        .catch(err => {
          console.error(err);
        });
    }

  }

  handleItemDelete = (e) => {
    const file=this.state.file
    // config.dirName = this.state.dirName;
    //
    //  S3FileUpload.deleteFile(file.name,config)
    //    .then(res=>{
    //       this.props.onDelete(this.state)
    //    })
    //    .catch(err=>console.log(err))
    this.props.onDelete(this.props.index);
  };

  handleChange = (e) => {
    const { index } = this.props;
    let { name, value } = e.target;
    this.setState({
      name: e.target.value
    });
    if (!value) {
      value="noteSheetAttachment"
    }
      this.props.onNameChanged(value,index);
  };

  render() {
    const { loading } = this.state;
    let view = loading ?
        <LinearProgress  variant={"indeterminate"} color={"primary"}/>
      :
      <ListItem component={"li"}>
          <TextField inputProps={inputProps}  variant={"outlined"}  value={this.state.name} onChange={this.handleChange.bind(this)} fullWidth={true}
           InputProps={{
             endAdornment:
               <InputAdornment position={"end"}>
                 <IconButton href={"#"} onClick={this.handleItemDelete.bind(this)} >
                   <DeleteIcon color={"secondary"}/>
                 </IconButton>
               </InputAdornment>
           }}
          />
      </ListItem>;
    return (
      view
    );

  }
}

NotesheetAttachmentItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onNameChanged: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  attachment: PropTypes.object
};

export default NotesheetAttachmentItem;