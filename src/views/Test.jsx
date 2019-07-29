import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import Card from "react-bootstrap/Card";
import { CardContent } from "@material-ui/core";
import OfficeFileUpload from "../components/OfficeFileUpload";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
        <th>column 1</th>
        <th>column 2</th>
        <th>column 3</th>
        </thead>
        <tbody>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

class Test extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <OfficeFileUpload fullWidth={true} document={
            {name:"NOC",location:"fdfdfdfd",mandatory:true,mime:"application/pdf",status:"ready"}
          } onUploadFailure={e=>console.log("")} onUploadSuccess={e=>console.log("")}/>
        </Card>
      </div>
    );
  }
}

export default Test

