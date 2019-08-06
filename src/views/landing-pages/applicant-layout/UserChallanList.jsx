import React, { Component } from "reactn";
import moment from "moment";
import { Card, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";

import ChallanService from "../../../services/ChallanService";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const tableOptions = {
  filterType: "dropdown",
  rowsPerPage: 7,
  serverSide: false,
};
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
    name: "status",
    label: "STATUS",
    options: {
      customBodyRender: (val, tableMeta) => <Chip component={"div"} color={val === "paid" ? "primary" : "secondary"}
                                                  label={val}/>
    }
  }, {
    name: "created_at",
    label: "CREATED AT",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return moment(value).format("Do MMMM YYYY");
      }
    }
  }
];
const ChallanList = ({ title, challans }) => {
  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "black"
        },
        paper: {
          boxShadow: "none"
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
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      {challans.length===0 ?
      <Card>
        <CardContent>
          <Typography paragraph={true}>No Challan is Created</Typography>
        </CardContent>
      </Card>
        :<MUIDataTable
        title={title}
        data={challans}
        columns={tableColumns}
        options={tableOptions}
      />}
    </MuiThemeProvider>

  );
};

class UserChallanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "shop",
      shop: [],
      hotel: [],
      banner: []
    };
    this.challanService = new ChallanService();
  }

  componentDidMount() {
    const { phone } = this.props;
    this.setGlobal({ loading: true });
    this.challanService.getUserChallan(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      (shop, hotel, banner) => this.setState({ shop, hotel, banner }))
      .finally(() => this.setGlobal({ loading: false }));
  }

  selectTab = (event, tabValue) => this.setState({ tabValue });

  render() {
    const { shop, hotel, banner, tabValue } = this.state;

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
              aria-label="user challan tabs"
            >
              <Tab href={"#"} label="SHOP" value={"shop"}/>
              <Tab href={"#"} label="HOTEL" value={"hotel"}/>
              <Tab href={"#"} label="BANNER" value={"banner"}/>
            </Tabs>

            {tabValue === "shop" && <ChallanList title={"SHOP : LIST OF CHALLAN"} challans={shop}/>}
            {tabValue === "hotel" && <ChallanList title={"HOTEL : LIST OF CHALLAN"} challans={hotel}/>}
            {tabValue === "banner" && <ChallanList title={"BANNER : LIST OF CHALLAN"} challans={banner}/>}

          </Paper>
        </CardContent>
      </Card>
    );
  }
}

UserChallanList.propTypes = {
  phone: PropTypes.string.isRequired
};

export default UserChallanList;