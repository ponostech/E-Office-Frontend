import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import List from '@material-ui/core/List/index';
import Divider from '@material-ui/core/Divider/index';
import AppBar from '@material-ui/core/AppBar/index';
import IconButton from '@material-ui/core/IconButton/index';
import Typography from '@material-ui/core/Typography/index';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide/index';
import DialogActions from "@material-ui/core/DialogActions/index";
import Toolbar from "@material-ui/core/Toolbar";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../draft/Editor";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ApiRoutes} from "../../../../config/ApiRoutes";

import { convertToHTML } from "nib-converter";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    editor: {
        minHeight: 200,
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class NoteCreateDialog extends React.Component {
    state = {
        content: "",
        action: null,
        priority: null,
        fixedDate: null,
        priorityTypes: [
            {name: 'Urgent', label: 'Urgent'},
        ],
        actionTypes: [
            {name: 'For necessary action. Please', label: 'For necessary action. Please'},
        ],
    };

    handleDateChange = dateDate => {
        this.setState({fixedDate: dateDate});
    };

    handleSelect = (identifier, value) => {
        switch (identifier) {
            case "action":
                this.setState({action: value});
                break;
            case "priority":
                this.setState({priority: value});
                break;
            default:
                break;
        }
    };

    handleSelectBlur = (identifier, e) => {
        switch (identifier) {
            case "priority":
                this.state.priority ? this.setState({priorityError: ""}) : this.setState({priorityError: "Priority Type is required"});
                break;
            case "action":
                this.state.action ? this.setState({actionError: ""}) : this.setState({actionError: "Select Type of action"});
                break;
            default:
                break;
        }
    };

    editorChange= (content) => {
        this.setState({content: convertToHTML(content)});
    };

    onSubmitNote = () => {
        let data = {
            file_id: this.props.file.id,
            content: this.state.content,
            action: this.state.action.name,
            priority: this.state.priority.name,
            fixed_date: moment(this.state.fixedDate).format('YYYY-MM-DD'),
            status: 1,
        };

        axios.post(ApiRoutes.NOTESHEET, data)
            .then(res => {
                this.props.close();
                console.log('Notesheet Added Successfully');
            })
            .catch(err => {
                console.log('Notesheet Added Failed');
            });
    };

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                fullScreen
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
                            Create Note
                        </Typography>
                        <Button onClick={this.props.close} color="inherit">
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <Card>
                        <CardHeader title={"File No.: " + this.props.file.number} subheader={"Subject: " + this.props.file.subject}/>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Branch: " secondary={this.props.file.branch} />
                        </ListItem>
                        <CardContent>
                            <Grid container spacing={16}>
                                <Grid item lg={12}>
                                    <Editor onChange={this.editorChange}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <OfficeSelect
                                        variant={"outlined"}
                                        margin={"dense"}
                                        value={this.state.action}
                                        required={true}
                                        fullWidth={true}
                                        name={"action"}
                                        error={!!this.state.actionError}
                                        onBlur={this.handleSelectBlur.bind(this, "action")}
                                        onChange={this.handleSelect.bind(this, "action")}
                                        ClearAble={true}
                                        label={"Select Action"}
                                        helperText={this.state.actionError}
                                        options={this.state.actionTypes}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <OfficeSelect
                                        variant={"outlined"}
                                        margin={"dense"}
                                        value={this.state.priority}
                                        required={true}
                                        fullWidth={true}
                                        name={"priority"}
                                        error={!!this.state.priorityError}
                                        onBlur={this.handleSelectBlur.bind(this, "priority")}
                                        onChange={this.handleSelect.bind(this, "priority")}
                                        ClearAble={true}
                                        label={"Set Priority"}
                                        helperText={this.state.priorityError}
                                        options={this.state.priorityTypes}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            fullWidth={true}
                                            InputLabelProps={
                                                {shrink: true}
                                            }
                                            label={"Fixed Date"}
                                            error={Boolean(this.state.dateError)}
                                            helperText={this.state.dateError}
                                            margin="dense"
                                            name={"fixedDate"}
                                            variant="outlined"
                                            value={this.state.fixedDate}
                                            onChange={this.handleDateChange}
                                            format={"dd/MM/yyyy"}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </List>
                <Divider/>
                <DialogActions>
                    <Button color="primary">Save Draft</Button>
                    <Button color="primary" onClick={this.onSubmitNote}>Save</Button>
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    };
}

export default withStyles(styles)(NoteCreateDialog);

