import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Card,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
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
  refresh=()=>{
    this.setGlobal({loading:false})
    setTimeout(()=>{
      this.setGlobal({loading:false})
    },2000)
  }

  selectTab=(event,tabValue)=>this.setState({tabValue})

  render() {
    const { tabValue } = this.state;
    return (
        <Card>
          <AppBar  position={"relative"} color={"inherit"}>
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                Challan: List of Challan
              </Typography>
              <IconButton onClick={e=>this.refresh()}>
                <Icon color={"primary"}>refresh</Icon>
              </IconButton>
            </Toolbar>
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
          </AppBar>
          <div>
              {tabValue === "unpaid" && <UnPaidChallanList/>}
              {tabValue === "paid" && <PaidChallanList/>}
          </div>
        </Card>
    );
  }
}

export default ChallanContainer;