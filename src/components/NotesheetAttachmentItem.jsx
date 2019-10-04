import React, { Component } from "react";
import PropTypes from "prop-types";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import moment from "moment";
import { CircularProgress, IconButton, InputAdornment, LinearProgress, ListItem,List, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import Paper from "@material-ui/core/Paper";

const inputProps = {
  step: 300
};
const dropZoneStyle = {
  padding: 40,
  border: 5,
  flexWrap: 1,
  background: "#f8f8f8",
  boxShadow: `2px 5px 2px #f0f0f0`
};

var uniqid = require("uniqid");
const config = {
  bucketName: BUCKET_NAME,
  dirName: "notesheet-attachments", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};



const AttachmentItem = ({ index,attachment, inputProps, onNameChange, onDelete,loading=false }) => {
  const changeName = (value) => {
    let temp = attachment;
    temp.name = value;
    onNameChange(index,temp);
  };

  const deleteAttachment = (attachment) => {
    //remove from s3
    onDelete(index);
  };

  let view = loading ?
    <LinearProgress variant={"indeterminate"} color={"primary"}/>
    :
    <ListItem component={"li"}>
      <TextField  variant={"outlined"} value={attachment.name}
                 onChange={event => changeName(event.target.value)} fullWidth={true}
                 InputProps={{
                   endAdornment:
                     <InputAdornment position={"end"}>
                       <IconButton href={"#"} onClick={event => deleteAttachment(attachment)}>
                         <DeleteIcon color={"secondary"}/>
                       </IconButton>
                     </InputAdornment>
                 }}
      />
    </ListItem>;
  return (
    view
  );
};

export const AttachmentView = ({ acceptedFiles, attachments,onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const onDrop = (acceptedFiles, rejectedFiles) => {
    let file = acceptedFiles[0];
    if (file) {

      let blob = file.slice(0, file.size, file.type);
      let newName = Date.now() + "-" + uniqid() + file.name.substr(file.name.lastIndexOf("."), file.name.length);
      let newFile = new File([blob], newName, { type: file.type });

      let loc = moment().format("YYYY-MM");
      config.dirName = `notesheet-attachments/${loc}`;

      setLoading(true);
      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          let temp={
            name:file.name,
            location: data.location
          }
          attachments.push(temp)
          onSuccess(attachments)
          setLoading(false)
        })
        .catch(err => {
          console.error(err);
        });
    }

  };
  const replaceAttachment=(index,attachment)=>{
    attachments[index] = attachment;
    onSuccess(attachments)
  }
  const removeAttachment=(index)=>{
    console.log(index)
    const res=attachments.filter((item,i)=>index!==i)
    console.log(res)
    onSuccess(res)
  }
  return (
    <Paper>
      <Dropzone multiple={false} accept={acceptedFiles} onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div style={dropZoneStyle}
                 {...getRootProps()}
                 className={classNames("dropzone", { "dropzone--isActive": isDragActive })}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <CircularProgress variant={"indeterminate"} color={"primary"}/> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          );
        }}
      </Dropzone>
      <List>
        {
          attachments.map((value, index) => {
            return (
              <AttachmentItem index={index} loading={loading} key={index} attachment={value} inputProps={null} onDelete={removeAttachment} onNameChange={replaceAttachment}/>);
          })
        }
      </List>
    </Paper>
  );
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
    let { file, attachment } = this.props;

    if (attachment) {
      this.setState({
        name: attachment.name,
        location: attachment.path,
        loading: false
      });
    }

    if (file) {

      let blob = file.slice(0, file.size, file.type);
      let newName = Date.now() + "-" + uniqid() + file.name.substr(file.name.lastIndexOf("."), file.name.length);
      let newFile = new File([blob], newName, { type: file.type });

      let loc = moment().format("YYYY-MM");
      config.dirName = `notesheet-attachments/${loc}`;

      this.setState({ file: newFile });

      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          this.setState({
            name: file.name,
            location: data.location,
            loading: false
          });
          this.props.addItem({ name: file.name, location: data.location });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleItemDelete = (e) => {
    const file = this.state.file;
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
      value = "noteSheetAttachment";
    }
    this.props.onNameChanged(value, index);
  };

  render() {
    const { loading } = this.state;
    let view = loading ?
      <LinearProgress variant={"indeterminate"} color={"primary"}/>
      :
      <ListItem component={"li"}>
        <TextField inputProps={inputProps} variant={"outlined"} value={this.state.name}
                   onChange={this.handleChange.bind(this)} fullWidth={true}
                   InputProps={{
                     endAdornment:
                       <InputAdornment position={"end"}>
                         <IconButton href={"#"} onClick={this.handleItemDelete.bind(this)}>
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