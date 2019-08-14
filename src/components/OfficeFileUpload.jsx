import React, { Component } from "react";
import { Button, CircularProgress, Icon, TextField } from "@material-ui/core";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import PropTypes from "prop-types";
var path = require('path');
var uniqid = require("uniqid");

const CONFIG = {
  bucketName: BUCKET_NAME,
  dirName: "test", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};
const DELCONFIG = {
  bucketName: BUCKET_NAME,
  dirName: "test", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

const STATUS = {
  READY: "ready",
  UPLOADING: "uploading",
  UPLOADED: "uploaded",
  FAILED: "failed"
};


const initialState={
  id:uniqid(),
  name: "",
  location: "",
  status: STATUS.READY,
  mandatory:true,
  mime:"images/*"
}

class OfficeFileUpload extends Component {

  constructor(props) {
    super(props);
    const{document}=props
    if (document) {
      this.state = {
        id:uniqid(),
        name: document.name,
        location: document.location,
        status: document.status,
        mandatory: document.mandatory,
        mime: document.mime
      };
    } else {
      this.state=initialState
    }

    this.fileUpload = window.document.createElement("input");
    this.fileUpload.type="file";
    let self=this
    this.fileUpload.accept=document?document.mime:"images/*";
    this.fileUpload.onchange= event => {
      let file = event.target.files[0];

      if (file) {
        self.setState({
          name:document? document.name:"",
          location: file,
          type: document? document.type:"image",
          status: STATUS.UPLOADING,
          mandatory: document.mandatory,
        });
        S3FileUpload.uploadFile(file, CONFIG)
          .then(res => {
            console.log(res);
            self.setState({ location: res.location, status: STATUS.UPLOADED });
            props.onUploadSuccess(res)
          })
          .catch(error => {
            console.log(error);
            self.setState({
              status: STATUS.FAILED
            });
          });
      }
    };

  }

  componentDidMount() {
    const { document } = this.props;

  }


  upload = (e) => {
    let self = this;
    const { document } = this.props;

    this.fileUpload.click();

  };
  remove = (e) => {
    const { location } = this.state;

    let filename = location.substring(location.lastIndexOf('/')+1);
    this.setState({ status: STATUS.UPLOADING });
    S3FileUpload.deleteFile(filename, CONFIG)
      .then(res => {
        this.setState({
          status: STATUS.READY
        });
      })
      .catch(err => {
        this.setState({
          status:STATUS.FAILED
        })
      });
  };
  reUpload = (e) => {
    this.upload(e);
  };

  render() {
    const { document, textFieldProps } = this.props;
    const { id,name, status, location, mime, mandatory } = this.state;
    return (
      <>
        {/*<input*/}
        {/*  accept={document.mime}*/}
        {/*  style={{ display: "none" }}*/}
        {/*  id={id}*/}
        {/*  name={document.name}*/}
        {/*  type={"file"}/>*/}

        <TextField
          variant={"outlined"}
          fullWidth={true}
          required={mandatory}
          name={name}
          value={location ? location.name ? location.name : location : ""}
          label={name}
          InputProps={{
            startAdornment:
              <>
                {status === STATUS.UPLOADED && <Icon color={"primary"} fontSize={"small"}>check</Icon>}
                {status === STATUS.FAILED && <Icon color={"secondary"} fontSize={"small"}>error</Icon>}
                {status === STATUS.UPLOADING &&
                <CircularProgress size={35} variant={"indeterminate"} color={"primary"}/>}
                {status === STATUS.READY && <Icon color={"primary"} fontSize={"small"}>book</Icon>}

              </>,
            endAdornment:
              <>
                {status === STATUS.READY &&
                <Button disabled={status === STATUS.UPLOADING} color={"primary"}  variant={"outlined"}
                        onClick={event => this.upload(event)} href={"#"}>Upload</Button>}
                {status === STATUS.UPLOADED &&
                <Button disabled={status === STATUS.UPLOADING} color={"primary"} variant={"outlined"}
                        onClick={event => this.remove(event)} href={"#"}>Change</Button>}
                {status === STATUS.FAILED &&
                <Button disabled={status === STATUS.UPLOADING} color={"primary"} variant={"outlined"}
                        onClick={event => this.reUpload(event)} href={"#"}>Upload</Button>}
              </>
          }}
          {...textFieldProps}
        />
      </>
    );
  }
}

OfficeFileUpload.defaultProps = {
  title: "Document Upload",
  applicationName: "default"
};
OfficeFileUpload.propTypes = {
  document: PropTypes.object.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  onUploadFailure: PropTypes.func.isRequired,
  applicationName: PropTypes.string
};
export default OfficeFileUpload;