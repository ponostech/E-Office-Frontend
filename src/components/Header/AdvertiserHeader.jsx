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
import { Button, IconButton, LinearProgress, Typography } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import GridContainer from "../Grid/GridContainer";
import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import Icon from "@material-ui/core/es/Icon";
import { authContext, Consumer } from "../../context/AuthContext";
import axios from "axios";
import { ApiRoutes } from "../../config/ApiRoutes";

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

  componentDidMount() {
    console.log(this.context);
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

  logout=()=>{
    const { history } = this.props;
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    axios.post(ApiRoutes.LOGOUT_ROUTE, {}, config)
      .then(res => {
        if (res.data.status) {
          history.push(OfficeRoutes.LOGIN);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
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
          <Typography variant={"caption"} color={"textSecondary"}>{"Welcome"} {localStorage.getItem("name")}</Typography>
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
      { name: "notesheet", label: "Notesheet", icon: "chat" },
      { name: "draft", label: "Draft", icon: "create" },
      { name: "report", label: "Site Verification", icon: "report" },
      { name: "permit", label: "Draft Permit", icon: "how_to_reg" },
      { name: "reject", label: "Draft Reject Letter", icon: "block" },
      { name: "send", label: "Forward File", icon: "send" }
    ];
    var list = (
      <GridContainer justify={"center"} direction={"column"} alignItems={"center"} style={{padding:20}}>
        <div>
          <Typography variant={"h5"} color={"primary"}>Menu</Typography>
        </div>
        <div>
          <List>
            {menuItem.map((item,index) => (
                <ListItem button key={index} onClick={() => this.props.click(item.name)}>
                  <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                  <ListItemText primary={item.label}/>
                </ListItem>
            ))}
          </List>
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
                <div style={{flex:1}}>
                  <Button href="#" color="transparent">
                    e-AMC-OFFICE
                  </Button>
                </div>
              </Hidden>
              <Hidden smDown>{menuItems} </Hidden>
              <Hidden  mdUp>
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

AdvertiserHeader.contextType = authContext;
export default withRouter(AdvertiserHeader);
