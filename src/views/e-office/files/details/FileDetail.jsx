import React, {Component} from "react";
import axios from 'axios';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "./Menu/FileLeftMenu";
import {Route, withRouter} from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";
import NoteSheet from "../notesheet/Notesheet";
import DraftPermit from "../draft/DraftPermit";
import DraftLetter from "../draft/DraftLetter";
import FileSend from "../FileSend";
import {ApiRoutes} from '../../../../config/ApiRoutes';

const styles = theme => ({
    root: {
        display: "flex",
        width: "100%",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    container: {
        display: "flex"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    }
});

class FileDetail extends Component {
    state = {
        file: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.props.doLoad(true);
        const {id} = this.props.match.params;
        this.getData(id);
    }

    getData(id) {
        axios.get(ApiRoutes.FILE_DETAIL + "/" + id)
            .then(res => {
                this.setState({file: res.data.data.files, loading: false});
                this.props.doLoad(false);
            })
            .catch(error => {
                this.props.doLoad(false);
                this.setState({error: true, loading: false});
            });
    }

    toggleContent = (name) => {
        const {history} = this.props;
        if (this.state.file.id)
            history.push("/e-office/file/" + this.state.file.id + "/detail/" + name);
    };

    render() {
        const {classes} = this.props;
        const {loading} = this.state;

        const view = (
            <>
                <LeftMenu click={this.toggleContent}/>
                <main className={classes.content}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Route path={OfficeRoutes.FILE_DETAIL + "/notesheet"}
                               render={(props) => <NoteSheet {...props} file={this.state.file}/>}/>
                        <Route path={OfficeRoutes.FILE_DETAIL + "/draft"}
                               render={(props) => <DraftPermit {...props} file={this.state.file}/>}/>
                        <Route path={OfficeRoutes.FILE_DETAIL + "/reject"}
                               render={(props) => <DraftLetter {...props} file={this.state.file}/>}/>
                        <Route path={OfficeRoutes.FILE_DETAIL + "/send"}
                               render={(props) => <FileSend {...props} doLoad={this.props.doLoad} file={this.state.file}/>}/>
                        <Route path={OfficeRoutes.FILE_DETAIL} exact
                               render={(props) => <NoteSheet {...props} file={this.state.file}/>}/>
                    </Grid>
                </main>
            </>
        );
        return (
            <Grid container className={classes.container}>
                <div className={classes.root}>
                    {loading ? "" : view}
                </div>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(FileDetail));