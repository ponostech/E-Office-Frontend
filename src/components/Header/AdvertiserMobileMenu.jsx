import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListIcon from "@material-ui/icons/ListAltRounded";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import SettingIcon from "@material-ui/icons/Settings";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  ADVERTISER_ACTIVE_HOARDING,
  ADVERTISER_ACTIVE_KIOSK,
  ADVERTISER_AVAILABLE_HOARDING,
  ADVERTISER_AVAILABLE_KIOSK,
  ADVERTISER_DASHBOARD,
  ADVERTISER_NEW_HOARDING,
  ADVERTISER_NEW_KIOSK,
  ADVERTISER_PROFILE,
  ADVERTISER_PROPOSED_HOARDING,
  ADVERTISER_PROPOSED_KIOSK,
  ADVERTISER_WITHDRAWN_HOARDING,
  ADVERTISER_WITHDRAWN_KIOSK
} from "../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import { Avatar, Divider, Grid } from "@material-ui/core";


function AdvertiserMobileMenu(props) {
  const [openHoarding, setOpenHoarding] = React.useState(false);
  const [openKiosk, setOpenKiosk] = React.useState(false);

  function handleHoarding() {
    setOpenKiosk(false);
    setOpenHoarding(!openHoarding);
  }

  function handleKiosk() {
    setOpenHoarding(false);
    setOpenKiosk(!openKiosk);
  }

  return (
    <Grid style={{ padding: 30 }} container={true} justify={"center"} direction={"column"} alignItems={"center"}>
      <Avatar src={"https://amcmizoram.com/uploads/gallery/44_18042017015907.jpg"} style={{ width: 80, height: 80 }}/>
      <Divider color={"red"}/>
      <List
        component="nav"
        title={<ListSubheader component="div">Menu</ListSubheader>}
      >
        <ListItem button onClick={e => {
          props.history.push(ADVERTISER_DASHBOARD);
          props.close();
        }}>
          <ListItemIcon>
            <DashboardIcon color={"primary"} fontSize={"small"}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={handleHoarding}>
          <ListItemIcon>
            <ListIcon fontSize={"small"} color={"primary"}/>
          </ListItemIcon>
          <ListItemText primary="Hoarding Application"/>
          {openHoarding ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={openHoarding} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <ListItem onClick={e => {
              props.close();
              props.history.push(ADVERTISER_NEW_HOARDING);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="New Hoarding"/>
            </ListItem>

            <ListItem onClick={e => {
              props.close();
              props.history.push(ADVERTISER_PROPOSED_HOARDING);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Purposed Hoardings"/>
            </ListItem>

            <ListItem onClick={e => {
              props.close();
              props.history.push(ADVERTISER_AVAILABLE_HOARDING);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Available Hoardings"/>
            </ListItem>

            <ListItem onClick={e => {
              props.close();
              props.history.push(ADVERTISER_ACTIVE_HOARDING);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Active Hoardings"/>
            </ListItem>

            <ListItem onClick={e => {
              props.close();
              props.history.push(ADVERTISER_WITHDRAWN_HOARDING);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Withdrawn Applications"/>
            </ListItem>
          </List>
        </Collapse>


        <ListItem button onClick={handleKiosk}>
          <ListItemIcon>
            <ListIcon fontSize={"small"} color={"primary"}/>
          </ListItemIcon>
          <ListItemText primary="Kiosk Application"/>
          {openKiosk ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={openKiosk} timeout="auto" unmountOnExit>
          <List dense={true} component="div" disablePadding>
            <ListItem onClick={e => {
              props.history.push(ADVERTISER_NEW_KIOSK);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="New Kiosk"/>
            </ListItem>

            <ListItem onClick={e => {
              props.history.push(ADVERTISER_PROPOSED_KIOSK);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Purposed Kiosks"/>
            </ListItem>

            <ListItem onClick={e => {
              props.history.push(ADVERTISER_AVAILABLE_KIOSK);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Available Kiosks"/>
            </ListItem>

            <ListItem onClick={e => {
              props.history.push(ADVERTISER_ACTIVE_KIOSK);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Active Kiosks"/>
            </ListItem>

            <ListItem onClick={e => {
              props.history.push(ADVERTISER_WITHDRAWN_KIOSK);
            }} button style={{ paddingLeft: 40 }}>
              <ListItemIcon>
                <StarBorder/>
              </ListItemIcon>
              <ListItemText primary="Withdrawn Kiosks"/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={e => {
          props.close();
          props.history.push(ADVERTISER_PROFILE);
        }}>
          <ListItemIcon>
            <SettingIcon fontSize={"small"} color={"primary"}/>
          </ListItemIcon>
          <ListItemText primary="Setting"/>
        </ListItem>

        <div style={{ flexWrap: "wrap" }}>
        </div>

        <ListItem button onClick={e => {
          props.history.push(ADVERTISER_DASHBOARD);
        }}>
          <ListItemIcon>
            <PowerIcon fontSize={"small"} color={"secondary"}/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    </Grid>

  );
}

export default withRouter(AdvertiserMobileMenu);