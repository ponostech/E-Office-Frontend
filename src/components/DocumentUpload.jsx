import React, { Component } from "react";
import { Button, InputAdornment, List, TextField, Typography } from "@material-ui/core";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import PropTypes from "prop-types";

var uploadDocument = [];

class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile = (id, e) => {
    const { files } = e.target;
    let item = files[0];
    console.log(item)
    uploadDocument[id] = item;
    this.setState({
      data: uploadDocument
    });
    console.log(uploadDocument);
  };

  getFilename = (id) => {
    const { data } = this.state;
    if (data[id]) {
      return data[id].name;
    }
    return "";
  };

  getUploadDocuments = () => {
    return [...new Set(uploadDocument)];
  };

  render() {
    const { documents, title } = this.props;
    var self = this;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant={"headline"}> {title}</Typography>
        </GridItem>
        <GridItem xs={12} md={12} sm={12}>
          <List>
            {
              documents.map(function(doc) {
                return (
                  <TextField
                    name={doc.id}
                    variant={"outlined"}
                    margin={"dense"}
                    label={doc.name}
                    value={self.getFilename(doc.id)}
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <input
                            style={{ display: "none" }}
                            id={doc.id}
                            name={doc.id}
                            type={"file"}
                            onChange={self.handleFile.bind(this, doc.id)}
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
                );
              })
            }
          </List>
        </GridItem>
      </GridContainer>
    );

  }
}

DocumentUpload.defaultProps = {
  documents: [],
  title: "Document Attachment"
};
DocumentUpload.propTypes = {
  documents: PropTypes.array.isRequired,
  title: PropTypes.string
};

export default DocumentUpload;
