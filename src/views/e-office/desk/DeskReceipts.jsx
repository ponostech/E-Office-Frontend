import React, { Component } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Chip, IconButton, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import SentIcon from "@material-ui/icons/Send";
import NoteIcon from "@material-ui/icons/Note";
import DraftIcon from "@material-ui/icons/Drafts";
import FileIcon from "@material-ui/icons/AttachFile";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import EyeIcon from "@material-ui/icons/RemoveRedEyeSharp";
import ReactTable from "react-table";
import ReceiptListDialog from "../receipt/ReceiptListDialog";
import { OfficeRoutes } from "../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import ReceiptMovementDialog from "../receipt/movement/ReceiptMovementDialog";
import FileDialog from "../files/FileDialog";

const columns = [
  {
    Header: "Receipt No",
    accessor: "id"
  }, {
    Header: "Description",
    accessor: "date"
  }, {
    Header: "Attachment",
    accessor: "attachment"
  }, {
    Header: "Created By",
    accessor: "user"
  }, {
    Header: "Dealing hand",
    accessor: "date"
  }, {
    Header: "Action",
    accessor: "action",
    sortable: false,
    filterable: false
  }
];

class DeskReceipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: "",
      filesOpen: false,
      openReceiptMovement: false
    };
  }

  handleReceiptMove = (data) => {
    this.setState({
      openReceiptMovement: false
    });
  };

  handleReceiptSelect = (receipt) => {
    this.setState({
      openReceipts: false
    });
  };

  render() {
    const { history } = this.props;
    return (
      <GridContainer>
        <GridContainer justify={"space-between"}>
          <GridItem style={{ marginBottom: 20 }}>
            <TextField variant={"standard"} label={"Search"} InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>
                  <SearchIcon color={"action"}/>
                </InputAdornment>
              )
            }}/>
          </GridItem>
          <GridItem style={{ marginBottom: 20 }}>
            <Tooltip title={"View"}>
              <IconButton disabled={Boolean(this.state.receipt)} onClick={(e) => history.push(OfficeRoutes.RECEIPT_DETAIL)}>
                <EyeIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Edit"}>
              <IconButton disabled={Boolean(this.state.receipt)} onClick={(e) => console.log("edit file")}>
                <EditIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Delete"}>
              <IconButton disabled={Boolean(this.state.receipt)} onClick={e => console.log("delete file")}>
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Forward"}>
              <IconButton disabled={Boolean(this.state.receipt)}
                          onClick={(e) => this.setState({ openReceiptMovement: true })}>
                <SentIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Put up File"}>
              <IconButton disabled={Boolean(this.state.receipt)} onClick={(e) => this.setState({ filesOpen: true })}>
                <FileIcon/>
              </IconButton>
            </Tooltip>

          </GridItem>
        </GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <ReactTable
            data={[]}
            columns={columns}
            defaultPageSize={5}
            pageSizeOptions={[5, 10, 20, 50, 100, 500]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Chip label={"Important"}/>
        </GridItem>
        <ReceiptMovementDialog open={this.state.openReceiptMovement} onClose={this.handleReceiptMove.bind(this)}
                               receipt={this.state.receipt}/>
                               <FileDialog open={this.state.filesOpen} onClose={this.handleFileAttach.bind(this)}/>
      </GridContainer>
    );
  }

  handleFileAttach() {
    this.setState({filesOpen:false})
  }
}

export default withRouter(DeskReceipts);