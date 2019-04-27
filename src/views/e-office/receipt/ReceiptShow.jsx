import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SentIcon from "@material-ui/icons/Send";
import InboxIcon from "@material-ui/icons/Inbox";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import ReceiptMovementDialog from "./movement/ReceiptMovementDialog";
import FileDialog from "../files/FileDialog";
// import {Document,Page} from "react-pdf";


const ReceiptDetail = (props) => {
  return (
    <div>
      <Typography variant={"headline"} color={"primary"}>Receipt id: 123</Typography>
      <Typography variant={"subheading"} color={"primary"}>Subject: 123</Typography>
      <Divider/>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>

    </div>
  );
};
const CommunicationDetail = (props) => {
  return (
    <div>
      <Typography variant={"headline"} color={"primary"}>Receipt id: 123</Typography>
      <Typography variant={"subheading"} color={"primary"}>Subject: 123</Typography>
      <Divider/>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>

    </div>
  );
};
const CategoryDetail = (props) => {
  return (
    <div>
      <Typography variant={"headline"} color={"primary"}>Receipt id: 123</Typography>
      <Typography variant={"subheading"} color={"primary"}>Subject: 123</Typography>
      <Divider/>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>
      <Typography variant={"caption"} color={"primary"}>attr: 123</Typography>

    </div>
  );
};

class ReceiptShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 12,
      numPages: null,
      pageNumber: 1,
      value: 0,
      openSentDialog:false,
      openFileDialog:false,
    };
  }

  onMoveReceipt=(e)=>{
      this.setState({openSentDialog:false})
  }
  handleFileSelect=(e)=>{
      this.setState({openFileDialog:false})
  }
  handleTabChange = (event, value) => {
    this.setState({ value });
  };
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { value } = this.state;
    const { history } = this.props;

    return (

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={"Receipt id:123123"} action={
              <IconButton onClick={(e)=>history.goBack()}>
                <CloseIcon/>
              </IconButton>
            }/>
            <GridContainer justify={"center"}>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer justify={"space-between"}>
                  <div>
                    <Tooltip title={"Edit"}>
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Forward"}>
                      <IconButton onClick={(e)=>this.setState({openSentDialog:true})}>
                        <SentIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Put in a file"}>
                      <IconButton onClick={(e)=>this.setState({openFileDialog:true})}>
                        <InboxIcon/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title={"Download"}>
                      <IconButton>
                        <DownloadIcon/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Print"}>
                      <IconButton>
                        <PrintIcon/>
                      </IconButton>
                    </Tooltip>
                  </div>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={7}>
                <Card>
                  <CardHeader>
                    <Typography color={"textPrimary"} variant={"headline"}>Receipt No: {this.state.id}</Typography>
                  </CardHeader>
                  <CardContent>

                    pdf details goes here
                    {/*<Document*/}
                    {/*file="/test.pdf"*/}
                    {/*onLoadSuccess={this.onDocumentLoadSuccess}*/}
                    {/*>*/}
                    {/*<Page pageNumber={1} />*/}
                    {/*</Document>*/}
                    {/*<p>Page {pageNumber} of {numPages}</p>*/}
                  </CardContent>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader title={"Receipt Info"} security={"info"} subheader={"Correspondence and issues"}>
                  </CardHeader>


                    <Tabs value={value} textColor={"primary"} onChange={this.handleTabChange.bind(this)}
                          variant={"fullWidth"}>
                      <Tab value={0} fullWidth={true} label={"Receipt detail"}/>
                      <Tab value={1} fullWidth={true} label={"Communication"}/>
                      <Tab value={2} fullWidth={true} label={"Category"}/>
                    </Tabs>
                    {value === 0 && <ReceiptDetail>Receipt Detail</ReceiptDetail>}
                    {value === 1 && <CommunicationDetail>Communication</CommunicationDetail>}
                    {value === 2 && <CategoryDetail> Category</CategoryDetail>}
                  <CardContent>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
        <ReceiptMovementDialog open={this.state.openSentDialog} onClose={this.onMoveReceipt} receipt={{id:12312}}/>
        <FileDialog open={this.state.openFileDialog} onClose={this.handleFileSelect}/>
      </GridContainer>
    );
  }
}

export default ReceiptShow;
