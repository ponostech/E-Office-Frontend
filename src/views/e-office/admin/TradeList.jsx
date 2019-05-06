import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDialog from "../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { TradeService } from "../../../services/TradeService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  button: {},
  actionIcon: {}
};

class TradeList extends React.Component {
  tradeService = new TradeService();
  state = {
    openDetail: false,
    trades: [],
    trade: {},
    errorMessage: ""
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.tradeService.fetch(errorMessage => this.setState({ errorMessage }), trades => this.setState({ trades }))
      .finally(() => doLoad(false));
  }

  openAssignment = (id) => {
    this.setState({ openAssignment: true });
  };
  takeFile = (data) => {
    this.setState({ openTakeFile: true, fileDetail: data.file });
  };
  confirmTake = (e) => {
    const { fileDetail } = this.state;
    console.log(fileDetail);
    this.setState({ openTakeFile: false });
    this.setState({ takeMessage: "You have taken the file" });
  };
  closeAssignment = () => {
    this.setState({ openAssignment: false });
  };

  viewDetail = (id) => {
    this.setState({ openDetail: true });
  };
  closeDetail = () => {
    this.setState({ openDetail: false });
  };

  render() {
    const { classes } = this.props;
    const { trades } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false,
      onTableChange: function(action, tableState) {
      }.bind(this)
    };

    const tableColumns = [
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.trades[rowIndex];
            return (
              <div>
                <Tooltip title={"Edit Trade"}>
                  <IconButton>
                    <EditIcon color={"action"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete Item"}>
                  <IconButton>
                    <DeleteIcon color={"error"}/>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        }
      },
      {
        name: "name",
        label: "NAME OF TRADE",
         }, {
        name: "rate",
        label: "Rate"
      },  {
        name: "fla",
        label: "FLA Required",
        options: {
          customBodyRender: (fla, tableMeta, updateValue) => {
            return (
              (fla===0 ? "Yes" : "No")

            );
          }
        }
         },

    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"TRADE: List of Trades"}
            data={trades}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>

        <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"} message={"Do you want to take this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>
        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })} open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(TradeList);
