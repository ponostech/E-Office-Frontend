import React, { Component } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Constraint from "../../../config/Constraint";
import PdfView from "../../../components/PdfView";
import DocumentsDropzone from "../../../components/DocumentsDropzone";

class NewReceipt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open:false
    };
  }

  onClose = (data) => {
    let fileReader=new FileReader();
    let temp = data.files[0];
    let d=URL.createObjectURL(temp);
    console.log(temp)
    console.log("fasdfasdf     "+d)
    this.setState({file:d});

  };

  getView = () => {
    if (this.state.file===null) {
      return (
        <div>
          <Button onClick={()=>{this.setState({open:true })}}>Upload</Button>
        <DocumentsDropzone documents={[
          { name: "PDF", fileName: "test" }
        ]} openDialog={this.state.open} onCloseHandler={this.onClose.bind(this)}
                           acceptedFiles={Constraint.ACCEPTED_DOCUMENTS}/>
        </div>
      );
    } else {
      return (
        <div>
          <embed src={this.state.file} width="500" height="375"
                 type="application/pdf"/>
          {/*<PdfView title={"File name"} file={this.state.file}/>*/}
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

          <Button variant={"outlined"} color={"primary"}>Create and Generate Receipt
            No</Button>
          <Button style={{ marginTop: 10 }} variant={"outlined"} color={"secondary"}>
            reset
          </Button>
          <embed src={this.state.file} width="500" height="375"
                 type="application/pdf"/>
          <iframe src={`${this.state.file}&embedded=true`}
                 style={{width:500,height:500}}>

          </iframe>
        </GridItem>
      </GridContainer>
    );
  }
}

export default NewReceipt;