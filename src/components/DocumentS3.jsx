import React, { Component } from "react";
import { Button, CircularProgress, InputAdornment, List, TextField, Typography } from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import PropTypes from "prop-types";
import S3FileUpload from "react-s3";
import TickIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DocumentIcon from "@material-ui/icons/Book";

const config = {
  bucketName: process.env.BUCKET_NAME,
  dirName: "office", /* optional */
  region: process.env.REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
};

console.log(config)

class DocumentS3 extends Component {
  constructor(props) {
    super(props);
    const { documents } = props;
    let temp = [];
    for (let i = 0; i < documents.length; i++) {
      let attr = { status: "prestine", file: null };
      documents[i] = { ...documents[i], ...attr };
      temp.push(documents[i]);
    }
    this.state = {
      neededDoc: temp
    };
  }


  getFilename = (id) => {
    const { neededDoc } = this.state;
    let value = {};
    neededDoc.map(function(item) {
      if (item.id === id) {
        value = item;
      }
    });
    if (value.file) {
      return value.file.name;
    }
    return undefined;
  };

  getUploadDocuments = () => {
    return this.state.neededDoc;
  };
  getStatusIcon = (id) => {
    const { neededDoc } = this.state;

    let item = {};
    neededDoc.filter(function(value) {
      if (value.id === id) {
        item = value;
      }
    });

    console.log(item);
    switch (item.status) {
      case "success":
        return <TickIcon color={"primary"}/>;
      case "fail":
        return <CloseIcon color={"error"}/>;
      case "progress":
        return <CircularProgress style={{ marginTop: 10, marginBottom: 10 }} color={"primary"}
                                 variant={"indeterminate"}/>;
      case "prestine":
        return <DocumentIcon/>;
      default:
        return <DocumentIcon/>;
    }
  };

  render() {
    const { documents, title } = this.props;
    const { neededDoc } = this.state;
    var self = this;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant={"headline"}> {title}</Typography>
        </GridItem>
        <GridItem xs={12} md={12} sm={12}>
          <List>
            {
              neededDoc.map(function(doc) {
                return (
                  <div>
                    <TextField
                      name={doc.id}
                      variant={"outlined"}
                      margin={"dense"}
                      label={doc.name}
                      value={self.getFilename(doc.id)}
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position={"start"}>
                            {self.getStatusIcon(doc.id)}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position={"end"}>
                            <input
                              accept={doc.type}
                              style={{ display: "none" }}
                              id={doc.id}
                              name={doc.id}
                              type={"file"}
                              onChange={(e) => {
                                const { files } = e.target;
                                let file = files[0];
                                let newDoc = [];
                                neededDoc.filter(function(val) {
                                  let newItem = val;
                                  if (newItem.id === doc.id) {
                                    newItem.status = "progress";
                                    newItem.file = file;
                                  }
                                  newDoc.push(newItem);
                                });
                                self.setState({
                                  neededDoc: newDoc
                                });
                                S3FileUpload
                                  .uploadFile(file, config)
                                  .then(data => {
                                    let newDoc = [];
                                    neededDoc.filter(function(val) {
                                      let newItem = val;
                                      if (newItem.id === doc.id) {
                                        newItem.status = "success";
                                        newItem.file = file;
                                      }
                                      newDoc.push(newItem);
                                    });
                                    self.setState({
                                      neededDoc: newDoc
                                    });
                                  })
                                  .catch(err => {
                                    let newDoc = [];
                                    neededDoc.filter(function(val) {
                                      let newItem = val;
                                      if (newItem.id === doc.id) {
                                        newItem.status = "fail";
                                        newItem.file = file;
                                      }
                                      newDoc.push(newItem);
                                    });
                                    self.setState({
                                      neededDoc: newDoc
                                    });
                                  });
                              }}
                            />
                            <label htmlFor={doc.id}>
                              <Button size={"small"} variant="outlined" component="span">
                                Upload
                              </Button>
                            </label>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                );
              })
            }
          </List>
        </GridItem>
      </GridContainer>
    );

  }
}

DocumentS3.defaultProps = {
  documents: [],
  title: "Document Attachment"
};
DocumentS3.propTypes = {
  documents: PropTypes.array.isRequired,
  title: PropTypes.string
};

export default DocumentS3;
