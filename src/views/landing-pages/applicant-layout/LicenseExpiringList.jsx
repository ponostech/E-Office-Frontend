import React, {Component} from "reactn";
import {LicenseService} from "../../../services/LicenseService";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import Chip from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton";
import {Icon} from "@material-ui/core";
import RenewShopLicenseDialog from "../../shop/RenewShopLicenseDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {ShopService} from "../../../services/ShopService";
import PropTypes from 'prop-types';
import LoadingView from "../../common/LoadingView";

class LicenseExpiringList extends Component {
  constructor(props) {
    super(props);
    const {permits} = props;
    this.state = {
      permits: permits ? permits : [],
      selectedPermit: null,
      openRenewDialog: false
    };
    this.licenseService = new LicenseService();
    this.shopService = new ShopService();
  }


  renewPermit = application => {
    this.setState({submitTitle: "Renew Permit", submit: true, openRenewDialog: false});
    this.shopService.renew(application,
        errorMsg => this.setGlobal({errorMsg}),
        (challan, successMsg) => {

          const MySwal = withReactContent(Swal);

          if (challan) {
            MySwal.fire({
              title: `Challan No:${challan.number}`,
              text: successMsg,
              type: "success",
              showCancelButton: true,
              cancelButtonText: "Close",
              confirmButtonColor: "#26B99A",
              confirmButtonText: "Pay Now (ONLINE)"
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                    "Pay!",
                    "Your application is paid.",
                    "success"
                );
              }
              this.componentDidMount()
            });
          } else {
            this.setGlobal({successMsg});
          }
          // this.props.refresh();
        })
        .finally(() => this.setState({submit: false}));
  };

  render() {
    const {selectedPermit, openRenewDialog} = this.state;
    const {permits} = this.props;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false
    };
    const tableColumns = [
      {
        name: 'number',
        label: 'PERMIT NO.'
      }, {
        name: 'approved_at',
        label: 'Date of Approval',
        options: {
          customBodyRender: (val) => {
            return moment(val).format('Do MMMM YYYY (\dddd\)')
          }
        }
      }, {
        name: 'valid_upto',
        label: 'Valid upto',
        options: {
          customBodyRender: (val) => {
            return moment(val).format('Do MMMM YYYY (\dddd\)')
          }
        }
      }, {
        name: 'valid_upto',
        label: 'Permit Status',
        options: {
          customBodyRender: (val, meta) => {
            const valid_upto = moment(val).valueOf()
            const current_time = moment().valueOf()
            const {rowIndex} = meta
            const selectedPermit = permits[rowIndex]

            let toBeReturned = []

            if (selectedPermit.is_applied)
              toBeReturned = <Chip size='small' color='primary' label='Renewal Applicaton already Submitted'/>

            return (
                <>
                  {toBeReturned}
                  {valid_upto < current_time ? <Chip size="small" color='secondary' label="Expired"/> : <Chip size="small" color='primary' label="Expiring"/>}
                </>
            )
          }
        }
      }, {
        name: 'id',
        label: 'Action',
        options: {
          customBodyRender: (val, meta) => {
            const {rowIndex} = meta
            const selectedPermit = permits[rowIndex]
            return (
                <IconButton href={"#"} onClick={event => this.setState({selectedPermit, openRenewDialog: true})}>
                  <Icon color={"primary"}>refresh</Icon>
                </IconButton>
            )
          }
        }
      }
    ]

    let found = <MUIDataTable
        title={"PERMIT: List of Expiring/Expired Permit"}
        data={permits}
        columns={tableColumns}
        options={tableOptions}/>;

    return (
        <>

          {this.global.loading ? <LoadingView/> : found}

          <RenewShopLicenseDialog onClose={() => this.setState({openRenewDialog: false})}
                                  license={selectedPermit}
                                  open={openRenewDialog}
                                  onResubmit={this.renewPermit}/>
        </>
    );
  }
}

LicenseExpiringList.propTypes = {
  permits: PropTypes.array.isRequired
};

export default LicenseExpiringList;