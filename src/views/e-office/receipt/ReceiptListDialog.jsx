import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  IconButton,
  InputAdornment,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import SearchIcon from "@material-ui/icons/Search";
import ReactTable from "react-table";
import  PropTypes from "prop-types";

const columns = [
  {
    Header: "",
    accessor: "id",
    Cell: props => (
      <input type={"checkbox"} name={"name"}/>
    )
  },
  {
    Header: "ID",
    accessor: "id"
  }, {
    Header: "Subject",
    accessor: "subject"
  }, {
    Header: "Other",
    accessor: "other"
  }
];

class ReceiptListDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receipt: null
    };
  }

  handleKeyDown = (e) => {
    // const { value } = e.target;
    if (e.keyCode===13){
      //TODO::do search
    }
  };
  handleClose = (e) => {
    const { name } = e.target;
    const { onClose } = this.props;
    switch (name) {
      case "confirm":
        onClose(this.state.receipt);
        break;
      case "cancel":
        onClose(null);
        break;
      case "close":
        onClose(null);
        break;
      default:
        break;
    }
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <Card style={{ padding: 20 }}>
          <CardHeader title={"List of receipts"} subheader={"Select one of the receipt for an attachment"} action={
            <IconButton name={"close"} onClick={this.handleClose.bind(this)}>
              <CloseIcon/>
            </IconButton>
          }/>
          <CardContent>
            <GridContainer>
              <GridItem>
                <TextField placeholder={"Type here"} fullWidth={true}
                           onKeyDown={this.handleKeyDown.bind(this)}
                           InputProps={{
                             endAdornment: (
                               <InputAdornment
                                 position="end">
                                 <SearchIcon/>
                               </InputAdornment>
                             )
                           }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <ReactTable
                  data={[
                    { id: 1, subject: "subject one", other: "other" },
                    { id: 2, subject: "subject one", other: "other" },
                    { id: 3, subject: "subject one", other: "other" },
                    { id: 4, subject: "subject one", other: "other" },
                    { id: 5, subject: "subject one", other: "other" },
                    { id: 6, subject: "subject one", other: "other" },
                    { id: 7, subject: "subject one", other: "other" }
                  ]}
                  showPagination={false}
                  columns={columns}
                  defaultPageSize={5}
                  pageSizeOptions={[5, 10, 20, 50, 100, 500]}
                />
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
        <DialogActions>
          <Button name={"confirm"} color={"primary"} variant={"contained"}
                  onClick={this.handleClose.bind(this)}>Confirm</Button>
          <Button name={"cancel"} color={"secondary"} variant={"contained"}
                  onClick={this.handleClose.bind(this)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ReceiptListDialog.propTypes={
  open:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired
}

export default ReceiptListDialog;