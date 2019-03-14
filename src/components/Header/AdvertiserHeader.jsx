import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";
import UserIcon from "@material-ui/icons/AccountCircleRounded";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import SettingIcon from "@material-ui/icons/Settings";
// core components
import Button from "components/CustomButtons/Button";
import { IconButton, Typography } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import GridContainer from "../Grid/GridContainer";
import { OfficeRoutes } from "../../config/routes-constant/OfficeRoutes";

class AdvertiserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFile: false,
      openDesk: false,
      openReceipt: false,
      openApplication: false,

      anchorEl: null
    };
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  componentDidUpdate(e) {
    // if (e.history.location.pathname !== e.location.pathname) {
    //   this.setState({ open: false });
    // }
  }

  handleKiosk = (e) => {
    const { history } = this.props;
    switch (e) {
      case "Create New":
        history.push(OfficeRoutes.NEW_RECEIPT);
        break;
      case "List Created":
        history.push(OfficeRoutes.CREATED_RECEIPT);
        break;
      case "List Sent":
        history.push(OfficeRoutes.SENT_RECEIPT);
        break;
      default:
        break;

    }
  };

  handleHoarding = (e) => {
    const { history } = this.props;
    switch (e) {
      case "New Hoarding proposal":
        history.push(OfficeRoutes.NEW_KIOSK);
        break;
      case "Active Hoarding":
        history.push(OfficeRoutes.ADVERTISER_HOARDING);
        break;
      case "Pending Application":
        history.push(OfficeRoutes.ADVERTISER_HOARDING);
        break;
      case "Rejected Application":
        history.push(OfficeRoutes.ADVERTISER_HOARDING);
        break;
      default:
        break;
    }
  };

  handleUser = (e) => {
    const { history } = this.props;
    history.push(OfficeRoutes.ADVERTISER_PROFILE);
  };

  render() {
    const { history } = this.props;
    const { anchorEl } = this.state;
    var menuItems = (
      <GridContainer justify={"space-between"}>
        <div style={{ display: "flex", alignItems: "center" }}>

          <IconButton style={{ marginLeft: 20 }} onClick={this.handleDesk.bind(this)}>
            <HomeIcon/>
          </IconButton>

          <CustomDropdown
            onClick={this.handleHoarding.bind(this)}
            dropdownList={["New Hoarding proposal", "Active Hoarding", "Pending Application", "Rejected Application"]}
            buttonText={"File"}
            buttonProps={{ color: "transparent" }}/>

          <CustomDropdown
            onClick={this.handleKiosk.bind(this)}
            dropdownList={["New Kiosk proposal", "Active Kiosk", "Pending Application", "Rejected Application"]}
            buttonText={"File"}
            buttonProps={{ color: "transparent" }}/>

          <Button style={{ background: "transparent", color: "black" }} onClick={(e) => {
          }} simple={true}> DSC</Button>

        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant={"caption"} color={"textSecondary"}>Hello Username</Typography>
          <IconButton onClick={this.handleUser.bind(this)}>
            <UserIcon/>
          </IconButton>
          <IconButton onClick={() => {
            history.push(OfficeRoutes.ADVERTISER_SETTING);
          }}>
            <SettingIcon/>
          </IconButton>
        </div>
      </GridContainer>
    );


    var list = (
      <div>
        <Typography color={"primary"} variant={"title"}>Hello world</Typography>
        <List>
          <ListItem>
            <NavLink to={"/apply"}>
              <ListItemIcon>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
              />
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/apply"}>
              <ListItemIcon>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
              />
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/apply"}>
              <ListItemIcon>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
              />
            </NavLink>

          </ListItem>

        </List>

      </div>
    );
    return (
      <AppBar position="fixed" color={"inherit"}>
        <Toolbar>{/*
          <Hidden smDown>
            <Typography color={"textPrimary"} variant={"title"}>E-AMC</Typography>
          </Hidden>*/}
          <Hidden mdUp>
            <div>
              <Button href="#" color="transparent">
                AMC-OFFICE
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{menuItems} </Hidden>
          <Hidden mdUp>
            <IconButton
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon/>
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}


export default AdvertiserHeader;
