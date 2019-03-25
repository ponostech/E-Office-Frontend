import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class ApplicationReport extends Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="John Doe"
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" variant="subtitle2" color="textPrimary">
                                        Jan 9, 2014
                                    </Typography>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider/>
                </List>
            </>
        )
    }
}

export default withStyles(styles)(ApplicationReport);