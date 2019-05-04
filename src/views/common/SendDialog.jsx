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
import OfficeSelect from "../../components/OfficeSelect";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {ApiRoutes} from "../../config/ApiRoutes";
import {FILE_IN_ACTIVE_LIST, FILE_SEND} from "../../config/routes-constant/OfficeRoutes";

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

class SendDialog extends React.Component {
    state = {
        user_id: null,
        staffs: [],
        recipient_id: null,
        loading: true,
    };

    componentDidMount() {
        this.getStaffs();
    }

    getStaffs = () => {
        axios.get(ApiRoutes.GET_STAFF)
            .then(res => {
                let staffs = this.formatStaff(res.data.data.staffs);
                this.setState({staffs: staffs});
            })
            .catch(err => {
            })
    };

    formatStaff = (staffs) => {
        const user_id = JSON.parse(localStorage.getItem('current_user')).id;
        return staffs.filter(function (obj) {
                return obj.id !== user_id;
            })
            .map(obj => {
                let temp = {};
                temp['value'] = obj.id;
                temp['label'] = obj.staff.name + " (" + obj.staff.designation + ")";
                return temp;
            });
    };

    handleOfficeSelect = (identifier, value) => {
        this.setState({
            [identifier]: value
        });
    };

    handleSubmit = () => {
        if (this.state.recipient_id) {
            let data = {
                recipient_id: this.state.recipient_id.value,
            };
            axios.post(FILE_SEND(this.props.file.id), data)
                .then(res => {
                    window.location.replace(FILE_IN_ACTIVE_LIST);
                })
        } else {
            console.log('Error');
        }
    };

    render() {
        console.log("File",this.props.file);
        const {classes} = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.close}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.close} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                            Send File to:
                        </Typography>
                        <Button onClick={this.props.close} color="inherit">
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText
                            primary="Select user below to assign the file to Officer/Staffs. Select carefully!"
                            secondary="Details of File shown below."/>
                    </ListItem>
                    <ListItem button>
                        <Grid container>
                            <Grid item xs={12}>
                                <OfficeSelect
                                    value={this.state.recipient_id}
                                    options={this.state.staffs}
                                    name={"recipient_id"}
                                    label={"Send File To"}
                                    variant={"outlined"}
                                    margin={"dense"}
                                    required={true}
                                    fullWidth={true}
                                    onChange={this.handleOfficeSelect.bind(this, "recipient_id")}/>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Computer File. No." secondary={this.props.file.id ? this.props.file.id : null} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="File No." secondary={this.props.file.number} />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="Subject: " secondary={this.props.file.subject} />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="Branch: " secondary={this.props.file.branch} />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="Classification: " secondary={this.props.file.classification} />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="Created On: " secondary={this.props.file.created_at} />
                    </ListItem>
                    <Divider/>
                </List>
                <DialogActions>
                    <Button color="primary" onClick={this.handleSubmit.bind(this)}>Assign</Button>
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default withStyles(styles)(SendDialog);

