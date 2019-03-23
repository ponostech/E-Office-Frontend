import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const HoardingDetailDialog = (props) => {
    const {classes} = props;
    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.close}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={props.close} aria-label="Close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                        Hoarding Application Details
                    </Typography>
                    <Button color="inherit" onClick={props.close}>
                        Close Detail
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemText primary="Name of Applicant" secondary="Lalhriatreng"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
            </List>
        </Dialog>
    );
};

export default withStyles(styles)(HoardingDetailDialog);

