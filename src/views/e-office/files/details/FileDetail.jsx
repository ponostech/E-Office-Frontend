import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import ApplicationReport from "./ApplicationReport";
import {Grid, Card, CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    container: {
        display: "flex"
    },
    root: {
        flexGrow: 1,
    }
});

class FileDetail extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Subject: Matter relating to" />
                    </Card>
                </Grid>
                <ApplicationReport/>
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);