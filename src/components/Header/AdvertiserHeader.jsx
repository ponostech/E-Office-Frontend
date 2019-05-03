import React from "react";
import { NavLink, withRouter } from "react-router-dom";
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
import UserIcon from "@material-ui/icons/AccountCircleRounded";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import SettingIcon from "@material-ui/icons/Settings";
// core components
import { Button, Grid, IconButton, LinearProgress, Typography } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import GridContainer from "../Grid/GridContainer";
import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import Icon from "@material-ui/core/es/Icon";
import { authContext } from "../../context/AuthContext";
import { LoginService } from "../../services/LoginService";
import { ADVERTISER_NEW_HOARDING } from "../../config/routes-constant/OfficeRoutes";
import { ADVERTISER_HOARDING } from "../../config/routes-constant/OfficeRoutes";
import { ADVERTISER_NEW_KIOSK } from "../../config/routes-constant/OfficeRoutes";
import { ADVERTISER_KIOSK } from "../../config/routes-constant/OfficeRoutes";
import { HOME } from "../../config/routes-constant/OfficeRoutes";
import { ADVERTISER_DASHBOARD } from "../../config/routes-constant/OfficeRoutes";

class AdvertiserHeader extends React.Component {
  loginService = new LoginService();

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

  componentDidMount() {
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

  logout = () => {
    const { history } = this.props;
    this.loginService.logout(errorMessage => console.log(errorMessage), msg => {
      history.push(OfficeRoutes.LOGIN);
    }).finally(() => console.info("log out request has been made"));
  };
  handleHoarding = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  handleKiosk = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  handleUser = (e) => {
    const { history } = this.props;
    history.push(OfficeRoutes.ADVERTISER_PROFILE);
  };

  render() {
    const { history, loading } = this.props;
    const { anchorEl } = this.state;
    var menuItems = (
      <GridContainer justify={"space-between"}>
        <div style={{ display: "flex", alignItems: "center" }}>


          <IconButton style={{ marginLeft: 20 }}>
            <HomeIcon/>
          </IconButton>

          <CustomDropdown
            dropdownList={[
              { title: "New hoarding", link: OfficeRoutes.ADVERTISER_NEW_HOARDING },
              { title: "List of hoarding", link: OfficeRoutes.ADVERTISER_HOARDING }
            ]}
            linkClick={this.handleHoarding.bind(this)}
            buttonText={"Hoarding"}
            buttonProps={{ color: "transparent" }}/>
          <CustomDropdown
            dropdownList={[
              { title: "New Kiosk", link: OfficeRoutes.ADVERTISER_NEW_KIOSK },
              { title: "List of kiosks", link: OfficeRoutes.ADVERTISER_KIOSK }
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
          <IconButton onClick={() => {
            history.push(OfficeRoutes.ADVERTISER_SETTING);
          }}>
            <SettingIcon/>
          </IconButton>
          <IconButton onClick={this.logout.bind(this)} color="error"><Icon>power_settings_new</Icon></IconButton>
          <NavLink to={OfficeRoutes.HOME}><IconButton color="default"><Icon>apps</Icon></IconButton></NavLink>

        </div>
      </GridContainer>
    );

    const menuItem = [
      { name: "dashboard", label: "Dashboard", icon: "dashboard",route:ADVERTISER_DASHBOARD },
      { name: "new_hoarding", label: "New Hoarding", icon: "tab",route:ADVERTISER_NEW_HOARDING },
      { name: "hoarding_list", label: "List of Hoarding", icon: "view_list",route:ADVERTISER_HOARDING },
      { name: "new_kiosk", label: "New Kiosk", icon: "smartphone",route:ADVERTISER_NEW_KIOSK },
      { name: "kiosk_list", label: "list of Kiosks", icon: "view_list",route:ADVERTISER_KIOSK },
    ];
    var list = (
      <GridContainer justify={"center"} direction={"column"} alignItems={"flex-start"} style={{ padding: 20 }}>
        <div>
          <Typography variant={"h5"} color={"primary"}>Menu</Typography>
        </div>
        <div style={{flex:1}}>
          <List>
            {menuItem.map((item, index) => (
              <ListItem button key={index} onClick={() =>{
                this.handleDrawerToggle()
                history.push(item.route)
              } }>
                <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                <ListItemText primary={item.label}/>
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{flex:1}}>

        </div>
        <div>
          <ListItem button onClick={() => new LoginService().logout((e)=>{console.error(e)},suc=>history.push(HOME))}>
            <ListItemIcon><Icon>power</Icon></ListItemIcon>
            <ListItemText primary={"Log out"}/>
          </ListItem>
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
                {list}
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

export default withRouter(AdvertiserHeader);
