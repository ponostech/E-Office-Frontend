import React, { Component } from "react";
import { List } from "@material-ui/core";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import NotesheetAttachmentItem from "./NotesheetAttachmentItem";

const config = {
  bucketName: BUCKET_NAME,
  dirName: "office/notesheet", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};
var uniqid = require("uniqid");

class NotesheetAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      attachments: []
    };
  }

  handleNameChanged = (name, index) => {
    const { attachments } = this.state;
    let items = [];

    for (let i = 0; i < attachments.length; i++) {
      let temp = {
        name: attachments[i].name,
        location: attachments[i].location
      };
      if (i === index) {
        temp.name = name;
      }
      items.push(temp);
    }
    this.setState({attachments:items})
    this.props.onSuccess(items);
  };

  addItem = (data) => {
    let attachments = [...this.state.attachments];
    attachments.push(data);
    this.setState({attachments})

    this.props.onSuccess(attachments);
  };

  deleteItem = (index) => {
    let files = [...this.state.files];
    let attachments = [...this.state.attachments];
    files.splice(index, 1);
    attachments.splice(index, 1);
    this.setState({ files, attachments });

    this.props.onSuccess(attachments);
  };
  onDrop = (acceptedFiles, rejectedFiles) => {
    const self = this;
    let files = self.state.files;
    files.push(acceptedFiles[0]);
    self.setState({ files });

  };

  render() {
    const { acceptedFiles } = this.props;

    return (
      <div>
        <Dropzone multiple={false} accept={acceptedFiles} onDrop={this.onDrop}>
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
          <List>
            {
              this.state.files.map((value, index) => {
                return (
                  <NotesheetAttachmentItem addItem={this.addItem} onNameChanged={this.handleNameChanged}
                                           onDelete={this.deleteItem} file={value} index={index}/>
                );
              })
            }
          </List>
        </div>
      </div>
    );
  }
}

//
NotesheetAttachment.defaultProps = {
  acceptedFiles: "image/*,application/pdf"
};
NotesheetAttachment.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  acceptedFiles: PropTypes.string
};
export default NotesheetAttachment;