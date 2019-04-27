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
import ReactQuill from "react-quill/types";
import 'react-quill/dist/quill.snow.css';
import Toolbar from "@material-ui/core/Toolbar";
import DialogContent from "@material-ui/core/DialogContent";

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

    modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    render () {
        const {classes} = this.props;
        const {note} = this.state;
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
                    <ListItem button>
                        <ListItemText primary="Write your note below. Html elements could be included in the field." secondary=""/>
                    </ListItem>
                </List>
                <DialogContent>
                    <ReactQuill className={classes.editor} value={note} theme="snow"
                                modules={this.modules}
                                formats={this.formats}
                                placeholder="Write Note..."/>
                </DialogContent>
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

