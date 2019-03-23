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
import DialogActions from "@material-ui/core/DialogActions";
import OfficeSelect from "../../../components/OfficeSelect";
import Grid from "@material-ui/core/Grid";

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

const ApplicationAssignmentDialog = (props) => {
    const {classes} = props;
    return (
        <Dialog

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
                        Assign Application to Staff
                    </Typography>
                    <Button onClick={props.close} color="inherit">
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemText primary="Select user below to assign the application. Select carefully!" secondary="Details of application shown below."/>
                </ListItem>
                <ListItem button>
                    <Grid container>
                        <Grid item xs={12}>
                            <OfficeSelect
                                value={""}
                                label={"Name of Staff"}
                                name={"userId"}
                                variant={"outlined"}
                                margin={"dense"}
                                fullWidth={true}
                                required={true}
                                error={""}
                                helperText={""}
                                options={props.staffs}/>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Name of Applicant" secondary="Lalhriatreng"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Address" secondary="Mualpui, Aizawl, Mizoram <br/>"/>
                </ListItem>
                <Divider/>
            </List>
            <DialogActions>
                <Button color="primary">Assign</Button>
                <Button color="secondary" onClick={props.close}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(ApplicationAssignmentDialog);

