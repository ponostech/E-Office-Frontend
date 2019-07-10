import React, { Component } from "reactn";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import CashPaymentDialog from "../../common/CashPaymentDialog";
import moment from "moment";
import ChallanService from "../../../services/ChallanService";

// challan no,application_no,details,type,created_at
const fake = [
  { challan_no: "123", application_no: "123", details: "detail", type: "fee", created_at: new Date() }
];

class ChallanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChallan: null,
      challans: fake,

      openPayByCashDialog: false
    };
    this.challanService = new ChallanService();

  }

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.challanService.all("unpaid",
      errorMsg => this.setGlobal({ errorMsg }),
      challans => this.setState({ challans }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  onCashPayment = (data) => {
    this.setState({ openPayByCashDialog: false });
  };

  render() {
    const { challans, openPayByCashDialog } = this.state;

    const tableColumns = [
      {
        name: "challan_no",
        label: "CHALLAN NO"
      }, {
        name: "type",
        label: "TYPE OF CHALLAN"
      }, {
        name: "application_no",
        label: "APPLICATION NO"
      }, {
        name: "detail",
        label: "DETAIL"
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
                <Tooltip title="Pay By Cash">
                  <IconButton color="primary" size="small"
                              aria-label="View File"
                              onClick={event => this.setState({ selectedChallan, openPayByCashDialog: true })}>
                    <Icon fontSize="small" color={"primary"}>account_balance_wallet</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Pay By Online"}>
                  <IconButton size='small ' onClick={(e) => {
                    this.setState({ selectedChallan });
                  }}>
                    <Icon fontSize="small" color={"primary"}>credit_card</Icon>
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
      rowsPerPage: 15,
      serverSide: false,
      responsive: "scroll"
    };
    return (
      <>
        {this.global.loading ? <LoadingView/> : <CardContent>
          <MUIDataTable
            title={"LIST OF CHALLAN"}
            data={challans}
            columns={tableColumns}
            options={tableOptions}
          />

        </CardContent>}

        <CashPaymentDialog open={openPayByCashDialog} onClose={this.onCashPayment} application={null}/>
      </>
    );
  }
}

export default ChallanList;