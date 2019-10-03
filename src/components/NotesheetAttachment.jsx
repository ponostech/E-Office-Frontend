import React, { Component } from "react";
import { CircularProgress, List } from "@material-ui/core";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import NotesheetAttachmentItem from "./NotesheetAttachmentItem";

const dropZoneStyle={
  padding:40,
  border:5,
  flexWrap:1,
  background:"#f8f8f8",
  boxShadow: `2px 5px 2px #f0f0f0`,
}
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

  componentDidMount() {
    this.setState({
      attachments: this.props.value
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { value } = nextProps;
    if (value) {
      this.setState({attachments:value})
    }
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
    this.setState({ attachments: items });
    this.props.onSuccess(items);
  };

  addItem = (data) => {
    let attachments = [...this.state.attachments];
    let files = [...this.state.files];
    attachments.push(data);
    this.setState({ attachments:[...attachments,...files] });

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
            {
              this.props.edit ? this.props.value.map((item, index) => <NotesheetAttachmentItem index={index}
                                                                                               addItem={this.addItem}
                                                                                               onNameChanged={this.handleNameChanged}
                                                                                               onDelete={this.deleteItem}
                                                                                               file={null}
                                                                                               attachment={item}/>) : ""
            }
          </List>
        </div>
      </div>
    );
  }
}

//
NotesheetAttachment.defaultProps = {
  acceptedFiles: "image/*,application/pdf",
  value: []
};
NotesheetAttachment.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  value: PropTypes.array,
  acceptedFiles: PropTypes.string
};
export default NotesheetAttachment;