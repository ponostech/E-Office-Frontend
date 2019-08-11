import React, { Component } from "reactn";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import { GET_STAFF, SHOP_LIST } from "../../../../config/ApiRoutes";
import ShopViewDialog from "./common/ShopViewDialog";
import LoadingView from "../../../common/LoadingView";
import GMapDialog from "../../../../components/GmapDialog";
import ErrorHandler from "../../../common/StatusHandler";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import CashPaymentDialog from "../../../common/CashPaymentDialog";

const styles = {};

class ShopUnpaidList extends Component {
  state = {
    shops: [],
    shop: null,
    openMap: false,
    openPaymentDialog: false,
    openViewDialog: false,
    lat: 0,
    lng: 0
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getData();

  }

  getData = () => {
    axios.get(SHOP_LIST, { params: { status: "new" } })
      .then(res => this.processResult(res))
      .catch(err => this.setGlobal({ errorMsg: err.toString() }))
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = (res) => {
    if (res.data.status) this.setState({ loading: false, shops: res.data.data.shops });
  };

  closeViewDialog = () => this.setState({ openViewDialog: false });

  viewDetails = (data) => this.setState({ openViewDialog: true, shop: data });
  payment = (data) => this.setState({ openPaymentDialog: true, shop: data });
  confirmPayment = (data) =>{
    this.setState({ openConfirmDialog: false})
    console.log(data)

  }

  render() {
    const { shop, shops, openViewDialog,openPaymentDialog, openMap } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 8,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "owner",
        label: "NAME OF APPLICANT"
      },
      {
        name: "name",
        label: "SHOP NAME"
      },
      {
        name: "local_council",
        label: "PROPOSED LOCATION",
        options: {
          customBodyRender: (value) => value.name
        }
      },
      {
        name: "created_at",
        label: "APPLICATION DATE",
        options: {
          filter: false,
          customBodyRender: (value) => <Chip label={"unpaid"} component={"div"} color={"secondary"} variant={"default"}/>
        }
      },
      {
        name: "created_at",
        label: "APPLICATION DATE",
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
            let data = shops[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);
            return (
              <>
                <Tooltip title='View Location in Map'>
                  <IconButton size='medium' onClick={e => this.setState({ openMap: true, lat: lat, lng: lng })}>
                    <Icon fontSize="small">pin_drop</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title='View Details'>
                  <IconButton color="primary" size="medium"
                              aria-label="View Details" onClick={this.viewDetails.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>

                <Tooltip title='Payment'>
                  <IconButton variant="contained" color="secondary"
                              size="medium" onClick={this.payment.bind(this, data)}>
                    <Icon fontSize="small">payment</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      }
    ];

    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"SHOP: List of Unpaid Application"}
            data={shops}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>}

        {openMap && <GMapDialog viewMode={true} open={openMap} lat={this.state.lat} lng={this.state.lng}
                                onClose={() => this.setState({ openMap: false })} isMarkerShown={true}/>}

        {openViewDialog &&
        <ShopViewDialog open={openViewDialog} close={this.closeViewDialog} data={shop}/>}

        {openPaymentDialog && <CashPaymentDialog application={shop} open={openPaymentDialog} onClose={this.confirmPayment}/>}
        {this.global.errorMsg && <ErrorHandler/>}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(ShopUnpaidList));
