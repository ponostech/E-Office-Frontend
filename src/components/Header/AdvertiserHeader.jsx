import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import UserIcon from "@material-ui/icons/AccountCircleRounded";
import MenuIcon from "@material-ui/icons/Menu";
import SettingIcon from "@material-ui/icons/Settings";
// core components
import { Button, CardActions, IconButton, LinearProgress, Typography, withStyles } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import GridContainer from "../Grid/GridContainer";
import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import Icon from "@material-ui/core/es/Icon";
import { LoginService } from "../../services/LoginService";
import AdvertiserMobileMenu from "./AdvertiserMobileMenu";

const styles = {
  menuLink:{
    color:"#333"
  }
};

class AdvertiserHeader extends React.Component {
  loginService = new LoginService();
  state = {
    openFile: false,
    openDesk: false,
    openReceipt: false,
    openApplication: false,
    anchorEl: null
  };

  handleDrawerToggle = () => this.setState({ open: !this.state.open });

  logout = () => {
    const { history } = this.props;
    this.loginService.logout(errorMessage => console.log(errorMessage), msg => {
      history.push(OfficeRoutes.LOGIN);
    }).finally(() => console.info("log out request has been made"));
  };

  handleHoarding = (path) => this.props.history.push(path);

  handleKiosk = (path) => this.props.history.push(path);

  handleUser = () => this.props.history.push(OfficeRoutes.ADVERTISER_PROFILE);

  render() {
    const { history, loading, classes } = this.props;
    let menuItems = (
      <GridContainer justify={"space-between"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink className={classes.menuLink} to={OfficeRoutes.ADVERTISER_DASHBOARD}>
            <IconButton
            color="primary"><Icon>dashboard</Icon>
            </IconButton>
          </NavLink>
          {"\u00A0 "}
          {"\u00A0 "}
          <NavLink className={classes.menuLink} to={OfficeRoutes.ADVERTISER_AVAILABLE_HOARDING}>
            <Button style={{padding:10, textTransform: "capitalize", fontSize: 14}}
                    variant={"contained"} color={"primary"}>Available hoarding</Button>
          </NavLink>
          {"\u00A0 "}
          {"\u00A0 "}
          <NavLink className={classes.menuLink} to={OfficeRoutes.ADVERTISER_AVAILABLE_KIOSK}>
            <Button style={{padding:10, textTransform: "capitalize", fontSize: 14}}
                    variant={"contained"}  color={"secondary"}>Available Kiosk</Button>
          </NavLink>
          {"\u00A0 "}
          {"\u00A0 "}
          <CustomDropdown
            dropdownList={[
              { title: "New hoarding", link: OfficeRoutes.ADVERTISER_NEW_HOARDING },
              { title: "Proposed Hoarding", link: OfficeRoutes.ADVERTISER_PROPOSED_HOARDING },
              { title: "Available Hoarding", link: OfficeRoutes.ADVERTISER_AVAILABLE_HOARDING },
              { title: "Active Hoarding", link: OfficeRoutes.ADVERTISER_ACTIVE_HOARDING },
              { title: "Withdrawn Hoarding", link: OfficeRoutes.ADVERTISER_WITHDRAWN_HOARDING }
            ]}
            linkClick={this.handleHoarding.bind(this)}
            buttonText={"Hoarding"}
            buttonProps={{ color: "transparent" }}/>

          <CustomDropdown
            dropdownList={[
              { title: "New Kiosk", link: OfficeRoutes.ADVERTISER_NEW_KIOSK },
              { title: "Proposed Kiosk", link: OfficeRoutes.ADVERTISER_PROPOSED_KIOSK },
              { title: "Available Kiosk", link: OfficeRoutes.ADVERTISER_AVAILABLE_KIOSK },
              { title: "Active Kiosk", link: OfficeRoutes.ADVERTISER_ACTIVE_KIOSK },
              { title: "Withdrawn Kiosk", link: OfficeRoutes.ADVERTISER_WITHDRAWN_KIOSK }
            ]}
            linkClick={this.handleKiosk.bind(this)}
            buttonText={"Kiosk"}
            buttonProps={{ color: "transparent" }}/>


        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant={"caption"}
                      color={"textSecondary"}>{"Welcome"} {LoginService.getCurrentUser().email}</Typography>
          <IconButton onClick={this.handleUser.bind(this)}>
            <UserIcon/>
          </IconButton>
          <IconButton onClick={() => history.push(OfficeRoutes.ADVERTISER_SETTING)}>
            <SettingIcon/>
          </IconButton>
          <IconButton onClick={this.logout.bind(this)} color="error"><Icon>power_settings_new</Icon></IconButton>
          <NavLink to={OfficeRoutes.HOME}><IconButton color="default"><Icon>apps</Icon></IconButton></NavLink>
        </div>
      </GridContainer>
    );

    return (
      <AppBar position="fixed" color={"inherit"}>
        <Toolbar>{/*
          <Hidden smDown>
            <Typography color={"textPrimary"} variant={"title"}>E-AMC</Typography>
          </Hidden>*/}
          <Hidden mdUp>
            <div style={{ flex: 1 }}>
              <Button href="#" color="transparent">
                e-AMC-OFFICE
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
                <AdvertiserMobileMenu close={e=>this.setState({open:false})}/>
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
        {
          loading ? <LinearProgress color={"primary"} variant={"indeterminate"}/> : undefined
        }

      </AppBar>

    );
  }
}

export default withRouter(withStyles(styles)(AdvertiserHeader));
