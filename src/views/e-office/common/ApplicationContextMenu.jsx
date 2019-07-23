import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

export const APPLICATION_MENUITEM = {
  SEND_BACK: "Send back Application",
  IMPOSE_FINE: "Impose FIne",
  RECEIVE_APPLICATION: "Receive Application",
  SEND_MESSAGE: "Send Message"
};

export function ApplicationContextMenu(props) {
  const { open, onClose, onMenuClick, application } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle style={{ textAlign: "center" }} title={"Menu"} color={"primary"}>
        MENU
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <List>
          {application && application.status === "new" &&
            <ListItem button={true} onClick={e => {
              onClose();
              onMenuClick(APPLICATION_MENUITEM.RECEIVE_APPLICATION);
            }}>
              <ListItemIcon>
                <Icon color={"action"}>desktop_mac</Icon>
              </ListItemIcon>
              <ListItemText>
                Receive Application
              </ListItemText>
            </ListItem>}

         {application && application.status!=="sent-back" &&
         <ListItem button={true} onClick={e => {
            onClose()
            onMenuClick(APPLICATION_MENUITEM.SEND_BACK)
          }}>
            <ListItemIcon>
              <Icon color={"action"}>send</Icon>
            </ListItemIcon>
            <ListItemText>
              Send Back Application
            </ListItemText>
          </ListItem>}

          <ListItem button={true} onClick={e => {onClose();onMenuClick(APPLICATION_MENUITEM.IMPOSE_FINE)}}>
            <ListItemIcon>
              <Icon color={"action"}>account_balance_wallet</Icon>
            </ListItemIcon>
            <ListItemText>
              Impose Fine
            </ListItemText>
          </ListItem>


          <ListItem button={true} onClick={e =>{
            onClose()
            onMenuClick(APPLICATION_MENUITEM.SEND_MESSAGE)
          }}>
            <ListItemIcon>
              <Icon color={"action"}>inbox</Icon>
            </ListItemIcon>
            <ListItemText>
              Send Message
            </ListItemText>
          </ListItem>

        </List>
      </DialogContent>

      <Divider/>
      <DialogActions>
        <Button variant={"text"} href={"#"} color={"secondary"} onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

