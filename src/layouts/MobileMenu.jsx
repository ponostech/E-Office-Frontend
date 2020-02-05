import React from "react";
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { ROOT } from "../config/routes-constant/OfficeRoutes";

const mobileStyle = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 30,
    minWidth: "200px"
  },
  logo: {
    margin: 10,
    alignSelf: "center",
    textAlign: "center"
  },
  title: {
    textAlign: "center"
  },
  menu: {
    flexGrow: 1
  }
};

const MobileMenu = ({ classes, history, toggleDrawer }) => {
  return (
    <div className={classes.root}>
      <img
        className={classes.logo}
        src={"https://amcmizoram.com/uploads/gallery/44_18042017015907.jpg"}
        alt={"logo"}
        width={70}
        height={70}
      />
      <Typography variant={"h6"} paragraph={true} className={classes.title}>
        Important Links
      </Typography>
      <List className={classes.menu} component="nav">
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Services"}
            secondary={"List of services provided by AMC"}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={event => {
                history.push(ROOT);
                toggleDrawer();
              }}
            >
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={"OBPAS"} />
          <ListItemSecondaryAction>
            <IconButton onClick={event => toggleDrawer()}>
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={"AMC Website"} />
          <ListItemSecondaryAction>
            <IconButton onClick={event => toggleDrawer()}>
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary={"About us"} />
          <ListItemSecondaryAction>
            <IconButton onClick={event => toggleDrawer()}>
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <Icon>phone</Icon>
          </ListItemIcon>
          <ListItemText primary={"Contact"} secondary={"9898999"} />
        </ListItem>
      </List>
    </div>
  );
};
export default withStyles(mobileStyle)(MobileMenu);
