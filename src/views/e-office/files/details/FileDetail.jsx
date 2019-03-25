import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import Notesheet from "../notesheet/Notesheet";
import {Grid, Card, CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CreateNoteButton from "../notesheet/CreateNoteButton";
import CreateNoteDialog from "../CreateNoteDialog";
import FileMenu from "./FileMenu";

const styles = theme => ({
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1,
    }
});

class FileDetail extends Component {
    state= {
        openNote: false,
    };
    openNoteDialog = () => {
        this.setState({openNote: true});
    };
    closeNoteDialog = () => {
        this.setState({openNote: false});
    };
    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}><Card><CardHeader title="Subject: Matter relating to" /></Card></Grid>
                <CreateNoteButton click={this.openNoteDialog}/>
                <FileMenu/>
                <Notesheet/>
                <CreateNoteButton click={this.openNoteDialog}/>
                <CreateNoteDialog open={this.state.openNote} close={this.closeNoteDialog}/>
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);