import React, { Component } from "reactn";
import {
  AppBar,
  Card,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import PaidChallanList from "./PaidChallanList";
import UnPaidChallanList from "./UnPaidChallanList";

class ChallanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "unpaid"
    };
  }
  refresh = () => {
    this.setGlobal({ loading: false });
    setTimeout(() => {
      this.setGlobal({ loading: false });
    }, 2000);
  };

  selectTab = (event, tabValue) => this.setState({ tabValue });

  render() {
    const { tabValue } = this.state;
    return (
      <Card>
        <AppBar position={"relative"} color={"inherit"}>
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Challan: List of Challan
            </Typography>
            <IconButton onClick={e => this.refresh()}>
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
            <Tab href={"#"} label="UNPAID CHALLAN" value={"unpaid"} />
            <Tab href={"#"} label="PAID CHALLAN" value={"paid"} />
          </Tabs>
        </AppBar>
        <div>
          {tabValue === "unpaid" && <UnPaidChallanList />}
          {tabValue === "paid" && <PaidChallanList />}
        </div>
      </Card>
    );
  }
}

export default ChallanContainer;
