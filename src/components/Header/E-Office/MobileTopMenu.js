import React from "react";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";
import * as OfficeRoute from "../../../config/routes-constant/OfficeRoutes";
import { LoginService } from "../../../services/LoginService";

const menuItems=[
  {
    name:"file",label:"File",menus:[
      {name:"New File",route:OfficeRoute.NEW_FILE},
      {name:"Created File",route:OfficeRoute.NEW_FILE},
      {name:"Sent File",route:OfficeRoute.NEW_FILE},
      {name:"Closed File",route:OfficeRoute.NEW_FILE},
    ]
  },{
    name:"receipt",label:"Receipt",menus:[
      {name:"New Receipt",route:OfficeRoute.NEW_RECEIPT},
      {name:"Created Receipt",route:OfficeRoute.CREATED_RECEIPT},
    ]
  },{
    name:"hoarding",label:"Hoarding Application",menus:[
      {name:"New Applications",route:OfficeRoute.NEW_HOARDINGS},
      {name:"Under-Process Applications",route:OfficeRoute.UNDER_PROCESS_HOARDINGS},
      {name:"Approved Applications",route:OfficeRoute.APPROVED_HOARDINGS},
      {name:"Rejected Applications",route:OfficeRoute.REJECTED_HOARDINGS},
    ]
  },
]
class MobileTopMenu extends React.Component {
  state = {
    openFile: false,
    openReceipt: false,
    openHoarding: false,
    openkiosk: false
  };

  handleClick=(name,e)=>{
    const { closeDrawer } = this.props;
    switch (name) {
      case "file":
        this.setState({ openFile: !this.state.openFile})
        break;
      case "receipt":
        this.setState({ openReceipt:!this.state.openReceipt})
        break;
      case "hoarding":
        this.setState({ openHoarding: !this.state.openHoarding})
        break;
      case "kiosk":
        this.setState({ openKiosk: !this.state.openkiosk})
        break
      default:
        break
    }
  }
  render() {

    const { classes,history,closeDrawer } = this.props;
    return (
      <div>
        <Typography color={"primary"} variant={"h4"}>Menu</Typography>
        <List className={classes.list}>

          <ListItem name={"file"} button onClick={this.handleClick.bind(this,"file")}>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText inset primary="File"/>
            {this.state.openFile ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.openFile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <NavLink to={OfficeRoute.NEW_FILE}>
                  <ListItemIcon>
                    <StarBorder/>
                  </ListItemIcon>
                  <ListItemText inset primary="New File"/>
                </NavLink>
              </ListItem>
              <ListItem className={classes.nested}>
                <NavLink to={OfficeRoute.CREATED_FILES}>
                  <ListItemIcon>
                    <StarBorder/>
                  </ListItemIcon>
                  <ListItemText inset primary="Created File"/>
                </NavLink>
              </ListItem>
              <ListItem className={classes.nested}>
                <NavLink to={OfficeRoute.FILE_ARCHIVED_LIST}>
                  <ListItemIcon>
                    <StarBorder/>
                  </ListItemIcon>
                  <ListItemText inset primary="Archived"/>
                </NavLink>
              </ListItem>
            </List>
          </Collapse>
          <ListItem onClick={e=>
            new LoginService().logout(error=>console.log("error"),success=>history.push(OfficeRoute.LOGIN))}
                    className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <Assessment/>
              </ListItemIcon>
              <ListItemText
                primary={"Log out"}
                disableTypography={true}
                className={classes.listItemText}
              />
          </ListItem>

        </List>
      </div>
    );
  }
}

export default MobileTopMenu;
