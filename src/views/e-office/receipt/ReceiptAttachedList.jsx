import React, { Component } from "reactn";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import CardContent from "@material-ui/core/CardContent";
import ReceiptService from "../../../services/ReceiptService";
import LoadingView from "../../common/LoadingView";
import { FileService } from "../../../services/FileService";
import AttachReceiptDialog from "./movement/AttachReceiptDialog";
import { EDIT_RECEIPT } from "../../../config/routes-constant/OfficeRoutes";
import SubmitDialog from "../../../components/SubmitDialog";
import ReceiptDetailDialog from "./ReceiptDetailDialog";

const styles = {};

class ReceiptAttachedList extends Component {
  receiptService = new ReceiptService();
  fileService = new FileService();

  state = {
    receipts: [],
    receipt: null,
    files: [],

    openAttach: false,
    view: false,
    submit:false

  };

  componentDidMount() {
    this.setGlobal({ loading: true });

    Promise.all([this.getReceipts(), this.getFiles()])
      .finally(() => this.setGlobal({ loading: false }));
  }

  getReceipts = async () => await this.receiptService.all("attached",
    errorMsg => this.setGlobal({ errorMsg }),
    receipts => this.setState({ receipts }))
    .finally(() => console.log("list of receipt request complete"));

  getFiles = async () => await this.fileService.all(
    errorMsg => this.setGlobal({ errorMsg }),
    files => {
      let list = [];

      files.map(file => {
        list.push({
          value: file.id,
          label: `${file.number} (${file.status})`
        });
      });
      this.setState({files:list})
    })
    .finally(() => console.log("list of files request complete"));


  view = (receipt) => {
      this.setState({receipt,view:true});
  };
  edit = (receipt) => {
    const { history } = this.props;
    history.push(EDIT_RECEIPT(receipt.id));
  };
  attach = (receipt) => {
    this.setState({ receipt, openAttach: true });
  };

  handleAttach = (receipt_id,file_id) => {
    if (receipt_id && file_id) {
      this.setState({ openAttach: false, submit: true });
      this.receiptService.attachToFile(receipt_id, file_id,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg }))
        .finally(() => this.setState({ submit: false }));
    }
    this.setState({ openAttach: false })
  }

  render() {
    const { receipt, receipts } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 16,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "number",
        label: "RECEIPT NO"
      }, {
        name: "subject",
        label: "SUBJECT"
      }, {
        name: "file",
        label: "FILE NO",
        options:{
          customBodyRender:(val)=>{
            let msg=val?val.number:"NA"
            return msg
          }
        }
      },{
        name: "classification",
        label: "CLASSIFICATION"
      },
      {
        name: "branch",
        label: "BRANCH"
      },
      {
        name: "letter_date",
        label: "LETTER DATE",
        options: {
          filter: false,
          customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
        }
      },{
        name: "received_on",
        label: "RECEIVED DATE",
        options: {
          filter: false,
          customBodyRender: (value) => moment(value).format("Do MMMM YYYY")
        }
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let data = receipts[rowIndex];
            return (
              <div>
                <Tooltip title="View details">
                  <IconButton href={"#"} color="primary" size="small"
                              aria-label="View File" onClick={this.view.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View File">
                  <IconButton href={"#"} color="primary" size="small"
                              aria-label="Edit receipt" onClick={this.edit.bind(this, data)}>
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                </Tooltip>
                {/*<Tooltip title="Attach to file">*/}
                {/*  <IconButton href={"#"} variant="contained" color="primary"*/}
                {/*              size="small" onClick={this.attach.bind(this, data)}>*/}
                {/*    <Icon fontSize="small">attach_file</Icon>*/}
                {/*  </IconButton>*/}
                {/*</Tooltip>*/}
              </div>
            );
          }
        }
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"Receipt: List of Attached Receipt"}
            data={receipts}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        <ReceiptDetailDialog open={this.state.view} onClose={e=>this.setState({view:false})} receipt={this.state.receipt}/>
        <SubmitDialog open={this.state.submit} text={"Please wait ..."} title={"Receipt Attachment"}/>
        <AttachReceiptDialog onClose={this.handleAttach.bind(this)}
                             open={Boolean(this.state.openAttach)}
                             files={this.state.files}
                             receipt={this.state.receipt}/>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(ReceiptAttachedList));
