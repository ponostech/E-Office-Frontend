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
import ReactDOMServer from 'react-dom/server';
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
   printChallan = (selectedChallan) => {
     let myWindow=window.open('','','width=600,height=700');
     myWindow.document.write(ReactDOMServer.renderToString(<ChallanReceipt challan={selectedChallan}/>));

     myWindow.document.close();

     myWindow.focus();
     myWindow.print();
     myWindow.close()

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
                  <IconButton size='small ' onClick={(e) => this.printChallan(selectedChallan)}>
                    <Icon fontSize="small" color={"action"}>print</Icon>
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
        </MuiThemeProvider>
        <div style={{display:"none"}} id={"receipt"}>
          <ChallanReceipt/>
        </div>
      </>
    );
  }
}

export default (PaidChallanList);