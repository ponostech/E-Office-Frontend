import React, { Component } from "react";
import axios from "axios";
import { ApiRoutes } from "../../config/ApiRoutes";
import { Button, InputAdornment, List, TextField, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

const style = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    justify: "center"
  }
};
var DOCS = [];

class AdvertiserDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredDocuments: [
        { id: 1, name: "voterid" },
        { id: 2, name: "NOC" }
      ],
      signatureFileName: "",
      signature: null,
      documents: []
    };
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillMount() {
    const route = ApiRoutes.BASE_URL + "\\document\\advertiser";
    axios.get(route)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFile = (id, e) => {
    const { files } = e.target;
    let item = files[0];
    DOCS[id] = item;
    this.setState({
      documents: DOCS
    });
  };
  handleSignature = (id, e) => {
    const { files } = e.target;
    let item = files[0];
    if (item) {
      this.setState({ signature: item });
    }
  };

  getFilename = (id) => {
    const { documents } = this.state;
    if (documents[id]) {
      return documents[id].name;
    }
    return "dd";
  };

  getSignature = () => {
    return this.state.signature;
  };
  getDocuments = () => {
    return this.state.documents;
  };

  render() {
    const { classes } = this.props;
    var self = this;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant={"headline"}> Document Required</Typography>
        </GridItem>
        <GridItem xs={12} md={12} sm={12}>
          <List>
            <TextField
              required={true}
              name={"signature"}
              variant={"outlined"}
              margin={"dense"}
              label={"Signature"}
              value={this.state.signature}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    <input
                      style={{ display: "none" }}
                      id="signature-id"
                      name={"signature"}
                      type={"file"}
                      onChange={self.handleSignature.bind(this)}
                    />
                    <label htmlFor={"signature-id"}>
                      <Button size={"small"} variant="outlined" component="span">
                        Upload
                      </Button>
                    </label>
                  </InputAdornment>
                )
              }}
            />
            {
              this.state.requiredDocuments.map(function(doc) {
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

export default withStyles(style)(AdvertiserDocument);
