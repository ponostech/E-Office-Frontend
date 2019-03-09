import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, Tooltip } from "@material-ui/core";
import ReactTable from "react-table";
import TextField from "@material-ui/core/es/TextField/TextField";

import SearchIcon from '@material-ui/icons/Search'
import ExportIcon from '@material-ui/icons/ImportExport'
import PdfIcon from '@material-ui/icons/PictureAsPdf'
import EditIcon from '@material-ui/icons/Edit'
import SentIcon from '@material-ui/icons/Send'
import AttachIcon from '@material-ui/icons/AttachFile'
import EyeIcon from '@material-ui/icons/Details'
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import ReceiptListDialog from "../receipt/ReceiptListDialog";
const columns = [
  {
    Header: "Receipt No",
    accessor: "id"
  }, {
    Header: "Description",
    accessor: "date"
  }, {
    Header: "Created By",
    accessor: "user"
  }, {
    Header: "Dealing hand",
    accessor: "date"
  }, {
    Header: "Action",
    accessor: "action"
  }, {
    Header: "Priority",
    accessor: "priority"
  }
];

class CreatedFiles extends Component {
  constructor(props) {
    super(props);
    this.state={
      openAttachDialog: false
    }
  }
  onReceiptSelect=(receipt)=>{
      this.setState({openAttachDialog:false})
  }
  render() {
    const { history } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader title={"Created Files"} action={
              (
                <div>
                  <Tooltip title={"Export"}>
                    <IconButton>
                      <ExportIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Pdf"}>
                    <IconButton>
                      <PdfIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
              )
            }/>
            <CardContent>
              <GridContainer  justify={"space-between"}>
                <div style={{margin:5}}>
                  <TextField placeholder={"Type here"}
                             InputProps={{
                               endAdornment: (
                                 <InputAdornment
                                   position="end">
                                   <SearchIcon/>
                                 </InputAdornment>
                               ),
                               placeholder: "Type here"
                             }}/>
                </div>
                <div style={{margin:5}}>
                  <Button color={"primary"} variant={"contained"}>New Button</Button>
                </div>
              </GridContainer>

              <GridContainer>
                <GridItem xs={11} sm={11} md={11}>
                  <ReactTable
                    data={[]}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 50, 100, 500]}
                  />
                </GridItem>
                <GridItem >
                  <GridContainer direction={"column"}>
                  <Tooltip title={"Edit"}>
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                  </Tooltip>
                  <Tooltip title={"Forward"}>
                    <IconButton>
                      <SentIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Attach receipt"}>
                    <IconButton onClick={(e)=>this.setState({openAttachDialog:true})}>
                      <AttachIcon/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Details"}>
                    <IconButton onClick={()=>history.push(OfficeRoutes.FILE_DETAIL)}>
                      <EyeIcon/>
                    </IconButton>
                  </Tooltip>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardContent>

          </Card>
        </GridItem>
        <ReceiptListDialog open={this.state.openAttachDialog} onClose={this.onReceiptSelect}/>
      </GridContainer>
    );
  }
}

export default CreatedFiles;