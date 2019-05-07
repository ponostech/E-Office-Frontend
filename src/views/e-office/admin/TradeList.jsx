import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OfficeSnackbar from "../../../components/OfficeSnackbar";
import { TradeService } from "../../../services/TradeService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TradeEditDialog from "./TradeEditDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class TradeList extends React.Component {
  tradeService = new TradeService();
  state = {
    trades: [],
    trade: null,

    errorMessage: "",
    successMessage: ""
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.tradeService.all(errorMessage => this.setState({ errorMessage }), trades => this.setState({ trades }))
      .finally(() => doLoad(false));
  }

  handleUpdate=(trade)=>{
    this.setState({trade:null})
    if (!trade) {
      return
    }
    console.log(trade);
    this.tradeService.update(trade,
      errorMessage=>this.setState({errorMessage}),
      successMessage=>this.setState({successMessage}))
      .finally(()=>console.info("trade update request complete"))
  }

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
                  <IconButton onClick={e=>this.setState({trade:data})}>
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
        label: "NAME OF TRADE"
      }, {
        name: "rate",
        label: "RATEs"
      }, {
        name: "fla",
        label: "FLA REQUIRED",
        options: {
          customBodyRender: (fla, tableMeta, updateValue) => {
            return (
              (fla === 0 ? "Yes" : "No")
            );
          }
        }
      }

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
        <TradeEditDialog open={Boolean(this.state.trade)} onClose={this.handleUpdate} trade={this.state.trade}/>

        <OfficeSnackbar variant={"success"} message={this.state.successMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.successMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })} open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(TradeList);
