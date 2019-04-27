import React, { Component } from "react";
import { CircularProgress, InputAdornment, TextField,Button } from "@material-ui/core";
import PropTypes from "prop-types";
import S3FileUpload from "react-s3";
import TickIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import DocumentIcon from "@material-ui/icons/Book";
import ImageIcon from "@material-ui/icons/Image";
import { BUCKET_NAME, REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } from "../Configuration";

var uniqid = require('uniqid');
const config = {
  bucketName: BUCKET_NAME,
  dirName: "office", /* optional */
  region: REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    let data = props.document;
    data.status = "prestine";
    this.state = {
      file: data
    };
  }

  getFilename = (file) => {
    if (file.file) {
      return file.file.name;
    }
    return undefined;
  };

  getUploadDocuments = () => {
    return this.state.neededDoc;
  };
  getStatusIcon = (file) => {
    switch (file.status) {
      case "success":
        return <TickIcon color={"primary"}/>;
      case "fail":
        return <ErrorIcon color={"error"}/>;
      case "progress":
        return <CircularProgress size={35} color={"primary"}
                                 variant={"indeterminate"}/>;
      case "prestine":
        if (file.type === "image")
          return <ImageIcon color={"action"}/>;
        return <DocumentIcon color={"action"}/>;
      default:
        return <ErrorIcon/>;
    }
  };

  render() {
    const { onUploadSuccess, onUploadFailure, required, ...rest } = this.props;
    const { file } = this.state;
    var self = this;

    return (
      <>
        <TextField
          {...rest}

          // onClick={() => {
          //   let imageUpload = document.getElementById(file.id);
          //   imageUpload.click();
          // }}
          onChange={() => {
            // let imageUpload = document.getElementById(file.id);
            // imageUpload.click();
          }}
          required={file.mandatory !== 0}

          name={file.name}
          variant={"outlined"}
          margin={"dense"}
          label={file.name}
          placeholder={file.name}
          value={self.getFilename(file)}
          fullWidth={true}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position={"start"}>
                {self.getStatusIcon(file)}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position={"end"}>
                <input
                  accept={file.mime}
                  style={{ display: "none" }}
                  id={file.id}
                  name={file.name}
                  type={"file"}
                  onChange={(e) => {
                    let item = e.target.files[0];

                    let blob = item.slice(0, item.size, item.type);
                    let newName = file.name.toLowerCase()+"-"+uniqid()+ item.name;
                    let newFile = new File([blob], newName, { type: item.type });

                    let temp = file;
                    temp.file = item;
                    temp.status = "progress";
                    self.setState({
                      file: temp
                    });
                    S3FileUpload
                      .uploadFile(newFile, config)
                      .then(data => {
                        temp.status = "success";
                        self.setState({
                          file: temp
                        });
                        onUploadSuccess(data);
                      })
                      .catch(err => {
                        temp.status = "fail";
                        self.setState({
                          file: temp
                        });
                        onUploadFailure(err);
                      });
                  }}
                />
                <label htmlFor={file.id}>
                  <Button size={"small"} variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </InputAdornment>
            )
          }}
        />
      </>
    );

  }
}

FileUpload.defaultProps = {
  title: "Document Upload",
  required: false
};
FileUpload.propTypes = {
  document: PropTypes.object.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  onUploadFailure: PropTypes.func.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool
};

export default FileUpload;
