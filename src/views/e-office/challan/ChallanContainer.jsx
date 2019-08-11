import React, { Component } from "reactn";
import { Card, Icon, IconButton, Paper, Tab, Tabs, Tooltip } from "@material-ui/core";
import LoadingView from "../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import CashPaymentDialog from "../../common/CashPaymentDialog";
import moment from "moment";
import ChallanService from "../../../services/ChallanService";
import SubmitDialog from "../../../components/SubmitDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PaidChallanList from "./PaidChallanList";
import UnPaidChallanList from "./UnPaidChallanList";

// challan no,application_no,details,type,created_at
const fake = [
  { challan_no: "123", application_no: "123", details: "detail", type: "fee", created_at: new Date() }
];

class ChallanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue:"unpaid"
    };

  }

  selectTab=(event,tabValue)=>this.setState({tabValue})

  render() {
    const { tabValue } = this.state;
    return (
        <Card>
          <CardContent>
            <Paper>

              <Tabs
                component={"div"}
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.selectTab}
                aria-label="Disabled tabs example"
              >
                <Tab href={"#"} label="UNPAID CHALLAN" value={"unpaid"}/>
                <Tab href={"#"} label="PAID CHALLAN" value={"paid"}/>
              </Tabs>

              {tabValue === "unpaid" && <UnPaidChallanList/>}
              {tabValue === "paid" && <PaidChallanList/>}

            </Paper>
          </CardContent>
        </Card>
    );
  }
}

export default ChallanContainer;