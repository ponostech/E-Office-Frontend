import React, { Component } from "reactn";
import LoadingView from "../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RateCreateDialog from "./RateCreateDialog";
import RateService from "../../../../services/RateService";
import SubmitDialog from "../../../../components/SubmitDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";

const fake=[
  {id:1,type:"hoarding",display_type:"illuminate",land_owner_type:"Private",category:"A",rate:10000}
]
class AdvertisementRateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: fake,
      selectedRate: null,

      confirmDelete: false,
      openCreate: false,
      openEdit: false,
      submit: false,

      submitTitle:"Submit"
    };
    this.rateService = new RateService();
  }

  componentDidMount() {
    // this.setGlobal({loading:true})
    this.setGlobal({loading:false})
  }

  onCreate = (data) => {
    this.setState({ openCreate: false,submitTitle:"Creating Advertisement Rate" });
    if (data) {
      this.setState({ submit: true });
      this.rateService.create(data, errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg }))
        .finally(() => this.setState({ submit: false }));
    }
  };
  deleteRate=()=>{
    const { selectedRate } = this.state;
    this.setState({confirmDelete:false});
    this.setState({submit:true,submitTitle:"Deleting Advertisement Rate"})
    this.rateService.delete(selectedRate.id,
      errorMsg=>this.setGlobal({errorMsg}),
      successMsg=>this.setGlobal({successMsg}))
      .finally(()=>this.setState({submit:false}))
  }

  render() {
    const {rates}=this.state
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15
    };

    const tableColumns = [
      {
        name: "type",
        label: "TYPES OF ADVERTISEMENT"
      }, {
        name: "display_type",
        label: "TYPE OF DISPLAY"
      }, {
        name: "landowner_type",
        label: "TYPE OF LANDLORD/LANDOWNER"
      }, {
        name: "category",
        label: "CATEGORY"
      },
      {
        name: "rate",
        label: "RATE",
        options: {
          customBodyRender: (rate, tableMeta) => new Intl.NumberFormat("en-IN", { style: 'currency', currency: 'INR' , maximumSignificantDigits: 2 }).format(rate)
        }
      }, {
        name: "id",
        label: "ACTION",
        options: {
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let rate = rates[rowIndex];

            return (
              <>
                <Tooltip title={"Edit"}>
                  <IconButton href={"#"} onClick={event => this.setState({ openEdit: true, selectedRate: rate })}>
                    <Icon color={"primary"}>edit</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                  <IconButton href={"#"} onClick={event => this.setState({ confirmDelete: true, selectedRate: rate })}>
                    <Icon color={"primary"}>delete</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      }];
    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"Hoarding: List of New Application"}
            data={rates}
            columns={tableColumns}
            options={tableOptions}
          />

          <Fab href={"#"} onClick={event => this.setState({ openCreate: true })} color="primary" aria-label="Add"
               style={{ position: "fixed", right: 80, bottom: 100, zIndex: 9000 }}>
            <Icon>add</Icon>
          </Fab>
        </CardContent>}

        <SubmitDialog open={this.state.submit} title={this.state.submitTitle} text={"Please wait ..."}/>
        <ConfirmDialog onCancel={e=>this.setState({openConfirm:false})} open={this.state.confirmDelete} onConfirm={this.deleteRate.bind(this)}/>
        <RateCreateDialog open={this.state.openCreate} onClose={this.onCreate.bind(this)}/>
      </>
    );
  }
}

export default AdvertisementRateView;