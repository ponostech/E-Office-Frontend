import React from 'react';
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
import GridItem from "../../../../components/Grid/GridItem";
import OfficeSelect from "../../../../components/OfficeSelect";
import Editor from "../draft/Editor";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

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
        fileId: null,
        content: "",
        action: null,
        priority: null,
        fixedDate: "",
    };
    handleDateChange = dateDate => {

        this.setState({ "date": dateDate });
    };
  handleSelect = (identifier, value) => {
    switch (identifier) {
      case "actionType":
        this.setState({ actionType: value });
        break;
      case "priorityType":
        this.setState({ priorityType: value });
        break;
        default:
        break;
    }
  };

  handleSelectBlur = (identifier, e) => {

    switch (identifier) {
      case "priorityType":
        this.state.priorityType ? this.setState({ priorityError: "" }) : this.setState({ priorityError: "Priority Type is required"});
        break;
      case "actionType":
        this.state.actionType === undefined ? this.setState({ actionError: ""}) : this.setState({ actionError: "Select Type of action" });
        break;
      default:
        break;
    }
  };

  render () {
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
                        <CardContent>
                            {/*Content*/}


                             <GridItem xs={12} sm={12} md={6}>
                                <Editor/>
                             </GridItem>
                            {/*Action*/}
                          <GridItem xs={12} sm={12} md={6}>
                            <OfficeSelect
                              variant={"outlined"}
                              margin={"dense"}
                              value={this.state.actionType}
                              required={true}
                              fullWidth={true}
                              name={"actionType"}
                              error={!!this.state.actionError}
                              onBlur={this.handleSelectBlur.bind(this, "actionType")}
                              onChange={this.handleSelect.bind(this, "actionType")}
                              ClearAble={true}
                              label={"Select Action"}
                              helperText={this.state.actionError}
                              options={this.state.actionTypes}/>
                          </GridItem>

                            {/*Priority*/}
                          <GridItem xs={12} sm={12} md={6}>
                            <OfficeSelect
                              variant={"outlined"}
                              margin={"dense"}
                              value={this.state.priorityType}
                              required={true}
                              fullWidth={true}
                              name={"priorityType"}
                              error={!!this.state.priorityError}
                              onBlur={this.handleSelectBlur.bind(this, "priorityType")}
                              onChange={this.handleSelect.bind(this, "priorityType")}
                              ClearAble={true}
                              label={"Set Priority"}
                              helperText={this.state.priorityError}
                              options={this.state.priorityTypes}/>
                          </GridItem>

                          {/*Fixed Date*/}
                            <GridItem xs={12} sm={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                      fullWidth={true}
                                      InputLabelProps={
                                          { shrink: true }
                                      }
                                      label={"Fix Date"}
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
                            </GridItem>
                           
                        </CardContent>
                    </Card>
                </List>
                <Divider/>
                <DialogActions>
                    <Button color="primary">Save Draft</Button>
                    <Button color="primary">Save</Button>
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    };
};

export default withStyles(styles)(NoteCreateDialog);

