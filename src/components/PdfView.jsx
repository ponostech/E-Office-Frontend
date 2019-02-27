import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import PropTypes from "prop-types";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import { IconButton, Typography } from "@material-ui/core";
import FirstIcon from "@material-ui/icons/FirstPage";
import PrevIcon from "@material-ui/icons/ArrowLeft";
import NextIcon from "@material-ui/icons/ArrowRight";
import LastIcon from "@material-ui/icons/LastPage";

class PdfView extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    console.log(numPages)
  };

  gotoFirst = () => {
    this.setState({ pageNumber: 1 });
  };
  gotoNext = () => {
    let num = this.state.pageNumber < this.state.numPages ? this.state.pageNumber+1 : this.state.numPages;
    this.setState({ pageNumber: num });
  };
  gotoPrev = () => {
    let num = this.state.pageNumber > 1 ? this.state.pageNumber - 1 : 1;
    this.setState({pageNum:num})
  };
  gotoLast = () => {
    this.setState({pageNumber:this.state.numPages})
  };

  render() {
    const { pageNumber, numPages,title, ...rest } = this.state;
    const { file } = this.props;

    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Typography variant={"title"}>
            {title}
          </Typography>
          <Document file={file}
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
          >
            <Page pageNumber={pageNumber}/>
          </Document>

          <div style={{display:'flex',justify:'center'}}>
            <IconButton onClick={this.gotoFirst.bind(this)}>
              <FirstIcon/>
            </IconButton>

            <IconButton onClick={this.gotoPrev.bind(this)}>
              <PrevIcon/>
            </IconButton>
            <p> Page {pageNumber} of {numPages}</p>
            <IconButton onClick={this.gotoNext.bind(this)}>
              <NextIcon/>
            </IconButton>
            <IconButton onClick={this.gotoLast.bind(this)}>
              <LastIcon/>
            </IconButton>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}


PdfView.propTypes = {
  file: PropTypes.string,
  title: PropTypes.string
};
export default PdfView;