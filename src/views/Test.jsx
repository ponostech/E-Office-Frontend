import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import NotesheetView from "./e-office/files/notesheet/NotesheetView";
import { AttachmentView } from "../components/NotesheetAttachmentItem";

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show:false
    }
  }

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
  constructor(props, context) {
    super(props, context);
    this.state={
      attachments:[]
    }
  }

  show=()=>{
     const MySwal = withReactContent(Swal)

     MySwal.fire({
       title: <p>Hello World</p>,
       footer: 'Copyright 2018',
       onOpen: () => {
         // `MySwal` is a subclass of `Swal`
         //   with all the same instance & static methods
         MySwal.clickConfirm()
       }
     }).then(() => {
       return MySwal.fire(<p>Shorthand works too</p>)
     })
   }
  render() {
    return (
      <div>
       <AttachmentView attachments={this.state.attachments} onSuccess={attachments=>this.setState({attachments})} acceptedFiles={"image/*"} />

      </div>
    );
  }
}

export default Test

