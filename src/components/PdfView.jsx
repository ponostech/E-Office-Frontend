import React, { Component } from "react";

class PdfView extends Component {
  render() {
    return (
        <div>
          <iframe src="/pdfjs/viewer.html/{src of PDF file}" >

          </iframe>
        </div>
    );
  }
}

export default PdfView;