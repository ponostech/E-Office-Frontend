import React, { Component } from "react";
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from "@material-ui/core";
import S3FileUpload from "react-s3";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import moment from "moment";
import PropTypes from 'prop-types'

var uniqid = require("uniqid");

const config = {
  bucketName: BUCKET_NAME,
  dirName: "office/notesheet", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

class NotesheetAttachment extends Component {
  state = {
    uploadedFiles: []
  };
  handleFileDelete = (uploadedFile) => {
    const self = this;
    config.dirName = uploadedFile.dirName;
    S3FileUpload.deleteFile(uploadedFile.file.name, config)
      .then(res => {
        console.log(res);
        let arr = self.state.uploadedFiles.forEach(function(item) {
          return item.name !== uploadedFile.name;
        });
        self.setState({ uploadedFiles: arr });
        self.props.onSuccess(self.state.uploadedFiles)
      })
      .catch(err => console.error(err));
  };
  renderUploadedFileList = () => {
    let view = (
      <List>
        {this.state.uploadedFiles.map((value,index) => {
          return (
            <ListItem key={index}>
              <ListItemText secondary={Math.round(value.file.size / 1024) + " Kb"} primary={value.name}
                            color={"primary"}/>
              <ListItemSecondaryAction>
                <Tooltip title={"Click here to delete"}>
                  <IconButton onClick={this.handleFileDelete.bind(this, value)}>
                    <DeleteIcon color={"error"}/>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
    return view;
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    const self = this;

    acceptedFiles.forEach(function(file, index) {
      let blob = file.slice(0, file.size, file.type);
      let newName = file.name.toLowerCase() + "-" + uniqid() + file.name;
      let newFile = new File([blob], newName, { type: file.type });
      let path = moment().format("DD-YYYY");

      config.dirName +="/"+ path;
      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          console.log(data);
          let newFiles = self.state.uploadedFiles;
          let temp = {
            name: file.name,
            dirName: config.dirName,
            file: newFile,
            location: data.location
          };
          newFiles.push(temp)
          self.setState({uploadedFiles:newFiles});
          self.props.onSuccess(self.state.uploadedFiles)
        })
        .catch(err => {
          console.error(err);
        });
    });

  };

  render() {
    const { acceptedFiles } = this.props;

    return (
      <div>
        <Dropzone accept={acceptedFiles} onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div style={{ padding: 40, border: 5, background: "#f8f8f8" }}
                   {...getRootProps()}
                   className={classNames("dropzone", { "dropzone--isActive": isDragActive })}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            );
          }}
        </Dropzone>
        <div>
          {this.renderUploadedFileList()}
        </div>
      </div>
    );
  }
}

NotesheetAttachment.defaultProps = {
  acceptedFiles: "image/*,application/pdf"
};
NotesheetAttachment.propTypes={
  onSuccess:PropTypes.func.isRequired,
  acceptedFiles: PropTypes.string
}
export default NotesheetAttachment;