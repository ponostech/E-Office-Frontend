import React, { Component } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, Paper } from "@material-ui/core";
import Dropzone from "react-dropzone";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Constraint from "../../../config/Constraint";
import PdfView from "../../../components/PdfView";

class NewReceipt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let temp = [...this.state.selectedFiles, ...acceptedFiles];
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const readAsArrayBuffer = reader.result;
        let f = new Blob([readAsArrayBuffer], { type: "application/pdf" });
        let t = URL.createObjectURL(f);
        this.setState({ file: f });
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsArrayBuffer(file);
    });

  };

  getView = () => {
    if (!this.state.file) {
      return (
        <Dropzone
          multiple={false}
          accept={Constraint.ACCEPTED_DOCUMENTS}
          onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <Paper style={{ padding: 50 }}
                     {...getRootProps()}
                // className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to
                      upload.</p>
                }
              </Paper>
            );
          }}
        </Dropzone>
      );
    } else {
      return (
        <div>
          <PdfView title={"File name"} file={this.state.file}/>
          <Button variant={"outlined"} color={"secondary"}>Cancel</Button>
        </div>

      );
    }
  };

  render() {

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader title={"New receipt"}/>

            <CardContent>
              <Divider/>
              {this.getView()}
              <Divider/>

            </CardContent>
            <CardActionArea>
              <CardActions title={"Upload"}/>
            </CardActionArea>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>

          <Button variant={"extendedFab"} color={"primary"}>Create and Generate Receipt
            No</Button>
          <Button style={{ marginTop: 10 }} variant={"outlined"} color={"secondary"}>
            reset
          </Button>
        </GridItem>
      </GridContainer>
    );
  }
}

export default NewReceipt;