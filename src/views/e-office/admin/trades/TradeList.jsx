import React, { Component } from "reactn";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { TradeService } from "../../../../services/TradeService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TradeEditDialog from "../TradeEditDialog";
import LoadingView from "../../../common/LoadingView";
import TradeCreateDialog from "./TradeCreateDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  button: {},
  actionIcon: {}
};

class TradeList extends Component {
  tradeService = new TradeService();
  state = {
    trades: [],
    trade: null,

    openCreate: false,
    openEdit: false,
    openConfirm: false,
    submit: false,

    submitTitle: "Creating New Trade"
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.tradeService.all(errorMsg => this.setGlobal({ errorMsg }), trades => this.setState({ trades }))
      .finally(() => {
        this.setGlobal({ loading: false });
      });
  }

  onUpdate = (trade = null) => {
    this.setState({ openEdit: false });
    if (trade) {
      this.setState({ submit: true, submitTitle: "Updating Trade" });
      this.tradeService.update(trade,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg }))
        .finally(() => this.setState({ submit: false }));
    }
  };
  onCreate = (trade) => {
    this.setState({ openCreate: false });
    if (trade) {
      this.setState({ submit: true, submitTitle: "Creating New Trade" });
      this.tradeService.create(trade,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg }))
        .finally(() => this.setState({ submit: false }));
    }
  };
  onDelete = () => {
    const { trade } = this.state;
    this.setState({ openConfirm: false });
    this.tradeService.delete(trade.id,
      errorMsg => this.setState({ errorMsg }),
      successMsg => this.setState({ successMsg }))
      .finally(() => this.setState({ submit: false }));

  };

  render() {
    const { classes } = this.props;
    const { trades } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15,
    };

    const tableColumns = [
      {
        name: "name",
        label: "NAME OF TRADE"
      },
      {
        name: "rate",
        label: "RATE",
        options:{
          customBodyRender:(value,tableMeta)=>{
            return new Intl.NumberFormat("en-IN",{currency:"INR",style:"currency"}).format(value)
          }
        }
      },
      {
        name: "fla",
        label: "FLA REQUIRED",
        options: {
          customBodyRender: (fla, tableMeta, updateValue) => {
            return (
              (fla === 0 ? "No" : "Yes")
            );
          }
        }
      },
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
                  <IconButton href={"#"} onClick={e => this.setState({ trade: data, openEdit: true })}>
                    <EditIcon fontSize={"small"} color={"action"}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete Trade"}>
                  <IconButton href={"#"} onClick={e => this.setState({ openConfirm: true, trade: data })}>
                    <DeleteIcon fontSize={"small"} color={"error"}/>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        }
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <Grid item xs={12}>
          <MUIDataTable
            title={"TRADE: List of Trades"}
            data={trades}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>}
        <TradeEditDialog open={this.state.openEdit} onClose={this.onUpdate.bind(this)} trade={this.state.trade}/>
        <TradeCreateDialog open={this.state.openCreate} onCreate={this.onCreate} onClose={()=>this.setState({openCreate:false})}/>

        <ConfirmDialog onCancel={e => this.setState({ openConfirm: false })} open={this.state.openConfirm}
                       onConfirm={this.onDelete.bind(this)}/>
        <SubmitDialog open={this.state.submit} text={"Please wait ..."} title={this.state.submitTitle}/>
        <Fab href={"#"} onClick={event => this.setState({openCreate:true })} color="primary" aria-label="Add" style={{position:"fixed",bottom:100,right:60}}>
          <AddIcon/>
        </Fab>
      </>
    );
  }
}

export default withStyles(styles)(TradeList);
