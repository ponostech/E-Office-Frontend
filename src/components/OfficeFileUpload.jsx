import React, { Component } from "react";
import { CircularProgress, Icon, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import S3FileUpload from "react-s3";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";
import PropTypes from "prop-types";
import FileUpload from "./FileUpload";
import moment from "moment";

var uniqid = require("uniqid");
const CONFIG = {
  bucketName: BUCKET_NAME,
  dirName: "", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

const STATUS={
  READY: "ready",
  UPLOADING:"uploading",
  UPLOADED:"uploaded",
  FAILED:"failed"
}
const doc={
  name:"NOC",
  location:"",
  status:STATUS.READY,
  mandatory:true,
  mime:"application/pdf"
}
const id=moment().toISOString()
class OfficeFileUpload extends Component {

  upload=(e)=>{
    const { document } = this.props;
    let fileUpload=document.getElementById(id);
    fileUpload.click()
  }
  remove=(e)=>{
    console.log(e)
  }
  reUpload=(e)=>{
    console.log(e)
  }
  render() {
    const {document,textFieldProps}=this.props
    return (
      <>
        <input
          accept={document.mime}
          style={{ display: "none" }}
          id={id}
          name={document.name}
          type={"file"}/>

        <TextField
          id={moment()}
          variant={"outlined"}
          fullWidth={true}
          required={document.mandatory}
          name={document.name}
          value={document.location}
          label={document.name}
          InputProps={{
            startAdornment:
            <>
              {document.status===STATUS.UPLOADED && <Icon color={"primary"} fontSize={"small"}>check</Icon>}
              {document.status===STATUS.FAILED && <Icon color={"secondary"} fontSize={"small"}>close</Icon>}
              {document.status===STATUS.UPLOADING && <CircularProgress variant={"indeterminate"} color={"primary"}/>}
              {document.status===STATUS.READY && <Icon color={"primary"} fontSize={"small"}>book</Icon>}

              </>,
            endAdornment:
            <>
              {document.status===STATUS.READY && <IconButton onClick={event => this.upload(event)} href={"#"}><Icon color={"primary"}>cloud_upload</Icon></IconButton>}
              {document.status===STATUS.UPLOADING && <IconButton disabled={true} onClick={event => console.log("")} href={"#"}><Icon color={"primary"}>more_horiz</Icon></IconButton>}
              {document.status===STATUS.UPLOADED && <IconButton onClick={event => this.remove(event)} href={"#"}><Icon color={"secondary"}>close</Icon></IconButton>}
              {document.status===STATUS.FAILED && <IconButton onClick={event => this.reUpload(event)} href={"#"}><Icon color={"secondary"}>close</Icon></IconButton>}
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