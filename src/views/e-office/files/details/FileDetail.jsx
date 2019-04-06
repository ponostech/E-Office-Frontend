import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LeftMenu from "./Menu/Left";
import Notesheet from "../notesheet/Notesheet";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
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
        sideMenu: {
            notesheet: true,
            draft: false
        }
    };
    toggleContent = (name) => {
        let oldMenu = this.state.sideMenu;
        let newMenu = {};
        Object.keys(oldMenu).map(key => {newMenu[key] = false;});

        this.setState({
            sideMenu: {
                ...newMenu,
                [name]: true
            }
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.container}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <LeftMenu click={this.toggleContent}/>
                    <main className={classes.content}>
                        <Notesheet show={this.state.sideMenu.notesheet}/>
                        {this.state.sideMenu.draft ? (
                            <p>Draft permit </p>
                        ): null}
                    </main>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(FileDetail);