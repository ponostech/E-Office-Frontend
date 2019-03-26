import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import Notesheet from "../notesheet/Notesheet";
import {Grid, Card, CardHeader, Divider} from "@material-ui/core";
import CreateNoteButton from "../notesheet/CreateNoteButton";
import CreateNoteDialog from "../CreateNoteDialog";
import FileMenu from "./FileMenu";
import CardBody from "../../../../components/Card/CardBody";

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
                <Card>
                    <CardHeader title="Subject: Matter relating to IT Cell" subheader="File No. AMC/ASF/ASD"/>
                    <CardBody>
                        <FileMenu/>
                        <CreateNoteButton click={this.openNoteDialog}/>
                        <Notesheet/>
                        <Divider/>
                        <CreateNoteButton click={this.openNoteDialog}/>
                        <br/>
                        <CreateNoteDialog open={this.state.openNote} close={this.closeNoteDialog}/>
                    </CardBody>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);