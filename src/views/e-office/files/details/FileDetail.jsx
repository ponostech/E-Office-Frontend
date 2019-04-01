import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import Notesheet from "../notesheet/Notesheet";
import {Card, CardHeader, Divider, Grid} from "@material-ui/core";
import CreateNoteButton from "../notesheet/CreateNoteButton";
import CreateNoteDialog from "../CreateNoteDialog";
import FileMenu from "./FileMenu";
import CardBody from "../../../../components/Card/CardBody";

import SweetAlert from "../../../common/SweetAlert";
import Heading from "../../../../components/Heading/Heading";

const styles = theme => ({
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1,
    }
});

class FileDetail extends Component {
    state = {
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
                    {/*<SweetAlert/>*/}
                    <Heading
                        textAlign="center"
                        title="Subject: Matter relating to IT Cell"
                        category={
                            <span>File No. AMC/ASF/ASD</span>
                        }
                    />
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