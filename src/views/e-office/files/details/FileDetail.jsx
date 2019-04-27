import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "./Menu/Left";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";
import Notesheet from "../notesheet/Notesheet";
import DraftPermit from "../draft/DraftPermit";
import DraftLetter from "../draft/DraftLetter";
import { CircularProgress } from "@material-ui/core";
import { FileService } from "../../../../services/FileService";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";

const styles = theme => ({
  root: {
    display: "flex"
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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: ""
    };
    this.fileService = new FileService();
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.fileService.get(id)
      .then(file => {
        console.log("whar the fuchhhh");
        console.log(file);
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: err.toString() });
      });

  }

  toggleContent = (name) => {
    const { history } = this.props;
    history.push("/e-office/file/:id/detail/" + name);
  };

  render() {
    const { classes } = this.props;
    const view = (
      <>
        <CssBaseline/>
        <LeftMenu click={this.toggleContent}/>
        <main className={classes.content}>
          <Grid item xs={12} md={12} lg={12}>
            <Route path={OfficeRoutes.FILE_DETAIL + "/notesheet"} component={Notesheet}/>
            <Route path={OfficeRoutes.FILE_DETAIL + "/draft"} component={DraftPermit}/>
            <Route path={OfficeRoutes.FILE_DETAIL + "/reject"} component={DraftLetter}/>
            <Route path={OfficeRoutes.FILE_DETAIL} exact component={Notesheet}/>
          </Grid>
        </main>
      </>
    );
    return (
      <Grid container className={classes.container}>
        <div className={classes.root}>
          {
            this.state.loading ? <CircularProgress variant={"indeterminate"} color={"primary"}/>
              : view
          }
        </div>
        <OfficeSnackbar variant={"error"} open={Boolean(this.state.errorMessage)}
                        onClose={(e) => this.setState({ errorMessage: "" })} message={this.state.errorMessage}/>
      </Grid>
    );
  }
}

export default withStyles(styles)(FileDetail);