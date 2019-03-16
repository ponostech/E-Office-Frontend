import React from "react";
import {Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";

const MobileTopMenu = (props) => {
    const {classes} = props;
    return (
        <div>
            <Typography color={"primary"} variant={"title"}>Hello world</Typography>
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
    )
};

export default MobileTopMenu;