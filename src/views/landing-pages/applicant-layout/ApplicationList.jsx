import React, {Component} from "react";
import {Card, createMuiTheme, Paper, Tab, Tabs} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import LicenseList from "./LicenseList";
import ShopApplicationList from "./applications/ShopApplicationList";

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      hotels: [],
      banners: [],
      tabValue: "shop"
    }
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

  render() {
    const {tabValue} = this.state;
    const {shopApplications} = this.props;

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
  bannerApplications: PropTypes.string.isRequired,
};

export default ApplicationList;