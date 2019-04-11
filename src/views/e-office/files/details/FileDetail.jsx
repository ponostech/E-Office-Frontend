import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "./Menu/Left";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Route} from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";

import Notesheet from "../notesheet/Notesheet";
import DraftPermit from "../draft/DraftPermit";
import DraftLetter from "../draft/DraftLetter";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    container: {
        display: "flex"
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

    };
    toggleContent = (name) => {
        const {history} = this.props;
        history.push('/e-office/file/:id/detail/' + name);
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.container}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <LeftMenu click={this.toggleContent}/>
                    <main className={classes.content}>
                        <Route path={OfficeRoutes.FILE_DETAIL + '/notesheet'} component={Notesheet} />
                        <Route path={OfficeRoutes.FILE_DETAIL + '/draft'}  component={DraftPermit} />
                        <Route path={OfficeRoutes.FILE_DETAIL + '/reject'}  component={DraftLetter} />
                        <Route path={OfficeRoutes.FILE_DETAIL} exact component={Notesheet} />
                    </main>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);