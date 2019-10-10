import React, { Component } from "reactn";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import ChallanService from "../../../services/ChallanService";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ChallanReceipt } from "../../print-template/ChallanReceipt";
import ReactToPrint from "react-to-print";
// challan no,application_no,details,type,created_at
const fake = [
  { challan_no: "123", application_no: "123", details: "detail", type: "fee", created_at: new Date() }
];

class PaidChallanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChallan: null,
      challans: [],
      printConfirm: false,
      openPayByCashDialog: false,
      submit: false,
      submitTitle: "Create Payment"
    };
    this.challanService = new ChallanService();
    this.challanRef = React.createRef();
  }

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.challanService.all("paid",
      errorMsg => this.setGlobal({ errorMsg }),
      challans => this.setState({ challans }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  printReceipt = () => {
    const { selectedChallan } = this.state;
    console.log(selectedChallan);
    window.document.createElement("hello");
    window.print();
  };
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
          padding: "2px 40px 2px 16px"
        }
      }
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
    }
  });
   printIframe = (id) => {
    const iframe = document.frames ? document.frames[id] : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  render() {
    const { challans, selectedChallan, openPayByCashDialog, printConfirm, submit, submitTitle } = this.state;

    const tableColumns = [
      {
        name: "number",
        label: "CHALLAN NO"
      }, {
        name: "type",
        label: "TYPE OF CHALLAN"
      }, {
        name: "application",
        label: "BILLED TO",
        options: {
          customBodyRender: (val, meta) => {
            const { rowIndex } = meta;
            const currentChallan = challans[rowIndex];
            switch (currentChallan.challanable_type) {
              case "App\\Shop":
                return currentChallan.application.owner;
              case "App\\Hotel":
                return currentChallan.application.owner;

              default:
                return currentChallan.challanable_type + "PaidChallanList.jsx";
            }
          }
        }
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
      },
      {
        name: "id",
        label: "ACTIONS",
        options: {
          customBodyRender: (hoarding, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const selectedChallan = challans[rowIndex];

            let viewBtn = (
              <>
                <Tooltip title={"Print Receipt"}>
                  <IconButton size='small ' onClick={(e) => this.printIframe("receipt")}>
                    <Icon fontSize="small" color={"primary"}>print</Icon>
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
        {/*{console.log('challan list', challans)}*/}
        <MuiThemeProvider theme={this.getMuiTheme()}>
          {this.global.loading ? <LoadingView/> : <CardContent>
            <MUIDataTable
              title={"LIST OF CHALLAN"}
              data={challans}
              columns={tableColumns}
              options={tableOptions}
            />

          </CardContent>}

          <ConfirmDialog message={`Do you want to print ${selectedChallan ? selectedChallan.number : ""}?`}
                         onCancel={e => this.setState({ printConfirm: false })}
                         open={printConfirm}
                         onConfirm={e => this.printReceipt()}/>
          <div style={{ display: "none" }}>
            <ChallanReceipt ref={this.challanRef} challan={selectedChallan}/>

          </div>
        </MuiThemeProvider>
        <iframe id="receipt" src="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=17&cad=rja&uact=8&ved=2ahUKEwjZ7cuPlJLlAhX97XMBHQ4EDt4QFjAQegQIAxAC&url=https%3A%2F%2Fslicedinvoices.com%2Fpdf%2Fwordpress-pdf-invoice-plugin-sample.pdf&usg=AOvVaw3LuLujg7LXhoXgwlL1dS4o" style={{display: 'none'}} title="Receipt" />
      </>
    );
  }
}

export default (PaidChallanList);