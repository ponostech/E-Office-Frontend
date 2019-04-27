import React, {Component} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

class FileDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: undefined,

            data: {},
            toError: ""
        };
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };
    handleClick = (e) => {
        const {open, onClose, receipt} = this.props;
        const {name} = e.target;
        switch (name) {
            case "sent":
                onClose(this.state.data);
                break;
            case "cancel":
                onClose(null);
                break;
            default:
                break;

        }
    };

    render() {
        const {to, cc, toError} = this.state;
        const {open, onClose, receipt} = this.props;

        return (
            <Dialog open={open} onClose={onClose} fullWidth={true}>
                <DialogTitle title={"List of Files"}>
                    Lis of Files
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth={true} label={"Type here ..."} variant={"standard"} margin={"dense"}
                               InputProps={
                                   {
                                       endAdornment: (
                                           <InputAdornment position={"end"}>
                                               <SearchIcon/>
                                           </InputAdornment>
                                       )
                                   }
                               }/>
                    <List title={"List of files"}>
                        <ListItem>
                            <ListItemText secondary={"Subject"} primary={"File no"}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <CheckIcon color={"default"}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText secondary={"Subject"} primary={"File no"}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <CheckIcon color={"default"}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText secondary={"Subject"} primary={"File no"}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <CheckIcon color={"primary"}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button name={"sent"} onClick={this.handleClick.bind(this)} color={"primary"}
                            variant={"contained"}> Confirm</Button>
                    <Button name={"cancel"} onClick={this.handleClick.bind(this)} color={"secondary"}
                            variant={"contained"}> Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

FileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default FileDialog;