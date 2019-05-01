import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button/index';
import Dialog from '@material-ui/core/Dialog/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import ListItem from '@material-ui/core/ListItem/index';
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

import Editor from "../draft/Editor";

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
        note: "",
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
                            <Editor/>
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

