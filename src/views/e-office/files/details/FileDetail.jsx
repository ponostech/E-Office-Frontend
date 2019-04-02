import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "./Menu/Left";


const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
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
                <LeftMenu/>
                    {/*<Card>
                        <SweetAlert/>
                        <Heading
                            textAlign="center"
                            title="Subject: Matter relating to IT Cell"
                            category={
                                <span>File No. AMC/ASF/ASD</span>
                            }
                        />
                        <CardBody>
                            <FileMenu/>
                            <LeftMenu/>
                            <main className={classes.content}>
                                <div className={classes.toolbar} />
                                <p style={{color:"red", padding: "200px"}}>test</p>
                                <Notesheet/>
                            </main>
                            <Divider/>
                            <CreateNoteButton click={this.openNoteDialog}/>
                            <br/>
                            <CreateNoteDialog open={this.state.openNote} close={this.closeNoteDialog}/>
                        </CardBody>
                    </Card>*/}
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);