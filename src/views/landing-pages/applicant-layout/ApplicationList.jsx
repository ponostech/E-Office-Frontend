import React, { Component } from "react";
import { Card, createMuiTheme, Paper, Tab, Tabs } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import ShopApplicationList from "./applications/ShopApplicationList";
import HotelApplicationList from "./applications/HotelApplicationList";

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      hotels: [],
      banners: [],
      tabValue: "shop"
    };
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

  selectTab = (event, val) => {
    this.setState({ tabValue: val });
  };

  render() {
    const { tabValue } = this.state;
    const { shopApplications, hotelApplications } = this.props;

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
              <Tab href={"#"} label="Shop" value={"shop"}/>
              <Tab href={"#"} label="Hotel" value={"hotel"}/>
              <Tab href={"#"} label="Banner" value={"banner"}/>
            </Tabs>
            {tabValue === "shop" && <ShopApplicationList theme={this.getMuiTheme()} applications={shopApplications}/>}
            {tabValue === "hotel" && <HotelApplicationList theme={this.getMuiTheme()} applications={hotelApplications}/>}
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

ApplicationList.propTypes = {
  phone: PropTypes.string.isRequired,
  shopApplications: PropTypes.string.isRequired,
  hotelApplications: PropTypes.string.isRequired,
  bannerApplications: PropTypes.string.isRequired
};

export default ApplicationList;