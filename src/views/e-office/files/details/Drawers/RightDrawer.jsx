import React from 'react';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Drawer, Icon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const rightDrawer = (props) => {
    const rightList = (
        <div className={props.classes.list}>
            <Typography variant="subtitle1" align="center">
                View
            </Typography>
            <Divider/>
            <List>
                {['Notesheet'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Typography variant="subtitle1" align="center">
                Create
            </Typography>
            <Divider/>
            <List>
                {['Draft Hoarding Permit', 'Blank Draft', 'Site Verification Report'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Drawer
            className={props.classes.drawer}
            variant="persistent"
            anchor="right"
            open={props.open}
            classes={{
                paper: props.classes.drawerPaper,
            }}
        >
            <div className={props.classes.drawerHeader}>
                <IconButton onClick={() => props.drawer('right', false)}>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            <Divider/>
            {rightList}
        </Drawer>
    );

};
export default rightDrawer;