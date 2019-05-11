import React, { Component } from "react";
import { List } from "@material-ui/core";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import moment from "moment";
import PropTypes from "prop-types";
import NotesheetAttachmentItem from "./NotesheetAttachmentItem";

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
  handleDelete = (uploadedFile) => {
    console.log(uploadedFile);
    let arr = [];
    this.state.uploadedFiles.forEach(item => {
      if (item.name !== uploadedFile.name) {
        arr.push(item);
      }
    });
    this.setState({
      uploadedFiles: arr
    });
    this.props.onSuccess(this.state.uploadedFiles);
  };
  renderUploadedFileList = () => {
    let view = (
      <List>
        {this.state.uploadedFiles.map((value, index) => {
          return (
            <NotesheetAttachmentItem onNameChanged={(newName)=>{
              this.setState(state=>state.uploadedFile[index].name=newName)
            }} file={value} key={index} onDelete={this.handleDelete.bind(this)}/>
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
      let loc = moment().format("DD-YYYY");

      config.dirName += "/" + loc;
      S3FileUpload.uploadFile(newFile, config)
        .then(data => {
          console.log(data);
          let newFiles = self.state.uploadedFiles;
          let temp = {
            id: uniqid(),
            name: file.name.substring(0, file.name.lastIndexOf('.')),
            dirName: config.dirName,
            file: newFile,
            location: data.location
          };
          newFiles.push(temp);
          self.setState({ uploadedFiles: newFiles });
          self.props.onSuccess(self.state.uploadedFiles);
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
NotesheetAttachment.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  acceptedFiles: PropTypes.string
};
export default NotesheetAttachment;