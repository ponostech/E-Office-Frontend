import React, { Component } from "react";
import ReceiptDetailEntry from "./ReceiptDetailEntry";
import { Paper } from "@material-ui/core";
import FileUpload from "../../../components/FileUpload";
import Grid from "@material-ui/core/Grid";


class ReceiptStore extends Component {
  state = {
    pdfFile: "https://amcmizoram.com/uploads/files/AMC%20Roadmap%20to%20Stability_15012019035648.pdf",
    numPages: null,
    pageNumber: 1
  };

  render() {
    const { pdfFile } = this.state;
    return (
      <Grid container justify="flex-start">
        <Grid item xs={12} sm={12} md={7}>
          <Paper style={{ padding: 20 }}>
            <FileUpload document={{ id: 0, name: "document", mime: "application/pdf" }} onUploadSuccess={data => {
              this.setState({
                pdfFile: data.location
              });
            }} onUploadFailure={(err) => console.log(err)}/>
            <object style={{ height: "80vh" }} data={pdfFile} type="application/pdf" width="100%"
                    height="100%">
              <p>It appears you don't have a PDF plugin for this browser. You can <a href="myfile.pdf">click
                here to download the PDF file.</a></p>
            </object>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <ReceiptDetailEntry/>
        </Grid>
      </Grid>
    );
  }
}

export default ReceiptStore;