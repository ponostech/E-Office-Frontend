import React, { Component } from "reactn";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import CashPaymentDialog from "../../common/CashPaymentDialog";
import moment from "moment";
import ChallanService from "../../../services/ChallanService";
import SubmitDialog from "../../../components/SubmitDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {MuiThemeProvider,createMuiTheme} from "@material-ui/core/styles";
// challan no,application_no,details,type,created_at
const fake = [
  { challan_no: "123", application_no: "123", details: "detail", type: "fee", created_at: new Date() }
];

class PaidChallanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChallan: null,
      challans: fake,

      openConfirm: false,
      openPayByCashDialog: false,
      submit: false,
      submitTitle: "Create Payment"
    };
    this.challanService = new ChallanService();
  }

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.challanService.all("paid",
      errorMsg => this.setGlobal({ errorMsg }),
      challans => this.setState({ challans }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  onCancelChallan = () => {
    const { selectedChallan } = this.state;
    this.setState({ openConfirm: false, submit: true, submitTitle: "Cancel Challan" });
    this.challanService.cancelChallan(selectedChallan.id,
      errorMsg => this.setGlobal({ errorMsg }),
      successMsg => this.setGlobal({ successMsg }))
      .finally(() => this.setState({ submit: false }));
  };
  onCashPayment = (data) => {
    this.setState({ openPayByCashDialog: false });
    if (data) {
      this.setState({ submit: true, submitTitle: "Create Payment" });
      this.challanService.createPayment(data,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => {
          this.setGlobal({ successMsg });
          this.componentDidMount();
        })
        .finally(() => this.setState({ submit: false }));
    }
  };

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "black"
        },
        paper: {
          boxShadow: "none"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          padding: "2px 40px 2px 16px",
        }
      },
    },
    palette: {
      primary: {
        main: "#26B99A",
        contrastText: "#fff"
      },
      secondary: {
        main: "#b93e46",
        contrastText: "#fff"
      }
    },
  });

  render() {
    const { challans, selectedChallan, openPayByCashDialog, openConfirm, submit, submitTitle } = this.state;

    const tableColumns = [
      {
        name: "number",
        label: "CHALLAN NO"
      }, {
        name: "type",
        label: "TYPE OF CHALLAN"
      }, {
        name: "details",
        label: "DETAIL"
      }, {
        name: "amount",
        label: "AMOUNT",
        options: {
          customBodyRender: (rate, tableMeta) => new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumSignificantDigits: 2
          }).format(rate)

        }
      }, {
        name: "created_at",
        label: "CREATED AT",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return moment(value).format("Do MMMM YYYY");
          }
        }
      }, {
        name: "id",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const selectedChallan = challans[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Cancel Challan"}>
                  <IconButton size='small ' onClick={(e) => {
                    this.setState({ selectedChallan, openConfirm: true });
                  }}>
                    <Icon fontSize="small" color={"secondary"}>highlight_off</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );

            return (viewBtn);
          }
        }
      }
    ];

    const tableOptions = {
      filterType: "dropdown",
      rowsPerPage: 10,
      serverSide: false,
      responsive: "scroll"
    };
    return (
      <>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          {this.global.loading ? <LoadingView/> : <CardContent>
            <MUIDataTable
              title={"LIST OF CHALLAN"}
              data={challans}
              columns={tableColumns}
              options={tableOptions}
            />

          </CardContent>}

          <ConfirmDialog onCancel={e => this.setState({ openConfirm: false })} open={openConfirm}
                         onConfirm={this.onCancelChallan.bind(this)}/>
          <CashPaymentDialog open={openPayByCashDialog} onClose={this.onCashPayment} challan={selectedChallan}/>
          <SubmitDialog open={submit} title={submitTitle} text={"Please wait ..."}/>
        </MuiThemeProvider>
      </>
    );
  }
}

export default (PaidChallanList);