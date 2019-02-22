import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
// core components
import Button from "components/CustomButtons/Button";


import pagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";
import { IconButton, Typography } from "@material-ui/core";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import GridContainer from "../Grid/GridContainer";

class OfficePageHeader extends React.Component {
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

  closeMenu = (e) => {
    this.setState({ anchorEl: null, openFile: false, openReceipt: false, openApplication: false });
  };
  handleMenuItem = (event) => {

    const { name } = event;
    const { history } = this.props;

    console.log(name);
    switch (name) {
      case "new-file":
        history.push("/e-office/file/new");
        break;
      case "created-file":
        history.push("/e-office/file/created");
        break;
      case "sent-file":
        history.push("/e-office/file/sent");
        break;
      case "new-receipt":
        history.push("/e-office/receipt/new");
        break;
      case "created-receipt":
        history.push("/e-office/receipt/created");
        break;
      case "sent-receipt":
        history.push("/e-office/receipt/sent");
        break;
      case "obpas":
        history.push("/e-office/application/obpas");
        break;
      default:
        break;
    }
  };
  handleMenu = (event) => {
    const name = event.target.name;
    this.setState({ anchorEl: event.currentTarget });
    switch (name) {
      case "file":
        this.setState({ openFile: true });
        break;
      case "receipt":
        this.setState({ openReceipt: true });
        break;
      case "application":
        this.setState({ openApplication: true });
        break;
      default:
        break;
    }
  };

  handleDesk = (e) => {
    const { history } = this.props;
    history.push("/e-office/desk");
  };

  handleFile = (e) => {
    const { history } = this.props;
    switch (e) {
      case "New file":
        history.push("/e-office/file/new");
        break;
      case "Created":
        history.push("/e-office/file/created");
        break;
      case "Sent":
        history.push("/e-office/file/sent");
        break;
      default:
        break;

    }
  };
  handleReceipt = (e) => {
    const { history } = this.props;
    switch (e) {
      case "New Receipt":
        history.push("/e-office/receipt/new");
        break;
      case "Created":
        history.push("/e-office/receipt/created");
        break;
      case "Sent":
        history.push("/e-office/receipt/sent");
        break;
      default:
        break;

    }
  };
  handleApplication = (e) => {
    const { history } = this.props;
    switch (e) {
      case "Obpas":
        history.push("/e-office/application/obpas");
        break;
      case "Hoarding":
        history.push("/e-office/application/hoarding");
        break;
      case "Kiosk":
        history.push("/e-office/application/kiosk");
        break;
      default:
        break;

    }
  };

  handleUser = (e) => {

  };

  render() {
    const { classes, color } = this.props;
    const { anchorEl } = this.state;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });

    var menuItems = (
      <GridContainer justify={"space-between"}>
        <div style={{display:"flex",alignItems:"center"}}>
          <IconButton style={{marginLeft:20}} onClick={this.handleDesk.bind(this)}>
            <HomeIcon/>
          </IconButton>
          <CustomDropdown onClick={this.handleFile.bind(this)} dropdownList={["New file", "Created", "Sent"]}
                          buttonText={"File"} buttonProps={{ color: "transparent" }}/>
          <CustomDropdown onClick={this.handleReceipt.bind(this)} dropdownList={["New Receipt", "Created", "Sent"]}
                          buttonText={"Receipt"} buttonProps={{ color: "transparent" }}/>
          <CustomDropdown onClick={this.handleApplication.bind(this)}
                          dropdownList={["Obpas", "Hoarding", "Shopping License", "Kiosk"]} buttonText={"Application"}
                          buttonProps={{ color: "transparent" }}/>
        </div>

        <div style={{display:"flex",alignItems:'center'}}>
          <Typography variant={"caption"} color={"textSecondary"}>Hello username</Typography>
          <IconButton onClick={this.handleUser.bind(this)}>
            <UserIcon/>
          </IconButton>
        </div>


        {/*<Button color={"transparent"} onClick={this.handleDesk.bind(this)} size={"sm"} name={"desk"}*/}
        {/*color={"primary"}> My desk</Button>*/}
        {/*<Button color={"transparent"} aria-owns={anchorEl ? "file-menu" : undefined}*/}
        {/*aria-haspopup={true} onClick={this.handleMenu.bind(this)} size={"sm"} name={"file"}*/}
        {/*color={"primary"}> File</Button>*/}
        {/*<Button color={"transparent"} aria-owns={anchorEl ? "receipt-menu" : undefined}*/}
        {/*aria-haspopup={true} onClick={this.handleMenu.bind(this)} size={"sm"} name={"receipt"}*/}
        {/*color={"primary"}> Receipt</Button>*/}
        {/*<Button color={"transparent"} aria-owns={anchorEl ? "application-menu" : undefined} aria-haspopup={true}*/}
        {/*onClick={this.handleMenu.bind(this)} size={"sm"} name={"application"}*/}
        {/*color={"primary"}> Application</Button>*/}

        {/*<Menu*/}
        {/*id={"file-menu"}*/}
        {/*anchorEl={anchorEl}*/}
        {/*open={this.state.openFile}*/}
        {/*onClose={this.closeMenu.bind(this)}>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(null,"newfile")} name={"new-file"}>New File</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"created-file"}>Inbox(Created)</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"sent-file"}>Sent</MenuItem>*/}
        {/*</Menu>*/}

        {/*<Menu*/}
        {/*id={"receipt-menu"}*/}
        {/*anchorEl={anchorEl}*/}
        {/*open={this.state.openReceipt}*/}
        {/*onClose={this.closeMenu.bind(this)}>*/}

        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"new-receipt"}>New Receipt</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"created-inbox"}>Inbox(Created)</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"sent-receipt"}>Sent</MenuItem>*/}
        {/*</Menu>*/}

        {/*<Menu*/}
        {/*id={"application-menu"}*/}
        {/*anchorEl={anchorEl}*/}
        {/*open={this.state.openApplication}*/}
        {/*onClose={this.closeMenu.bind(this)}>*/}

        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} value={"obpas"}>OBPAS Application</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"shopping"}>Shopping License</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"hoarding"}>Hoarding License</MenuItem>*/}
        {/*<MenuItem onClick={this.handleMenuItem.bind(this)} name={"kiosk"}>Kiosk</MenuItem>*/}
        {/*</Menu>*/}
      </GridContainer>
    );


    var list = (
      <div>
        <Typography color={"transparent"} variant={"title"}>Hello world</Typography>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <NavLink to={"/apply"} className={classes.navLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to={"/apply"} className={classes.navLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to={"/apply"} className={classes.navLink}>
              <ListItemIcon className={classes.listItemIcon}>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Apply"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
          </ListItem>

        </List>
      </div>
    );
    return (
      <AppBar position="fixed" color={"default"}>
        <Toolbar>
          <Hidden smDown>
            <Typography color={"textPrimary"} variant={"title"}>E-AMC</Typography>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                AMC-OFFICE
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{menuItems} </Hidden>
          <Hidden mdUp>
            <IconButton
              className={classes.sidebarButton}
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
                classes={{
                  paper: classes.drawerPaper
                }}
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

OfficePageHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(pagesHeaderStyle)(OfficePageHeader));
