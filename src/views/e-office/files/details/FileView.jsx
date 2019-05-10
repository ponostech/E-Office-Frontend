import React, {Component} from "react";
import axios from 'axios';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FileMenuLeft from "./Menu/FileMenuLeft";
import FileMenuRight from "./Menu/FileMenuRight";
import {Route, withRouter} from "react-router-dom";
import * as OfficeRoutes from "../../../../config/routes-constant/OfficeRoutes";
import NoteSheetView from "../notesheet/NotesheetView";
import DraftPermit from "../draft/DraftPermit";
import DraftLetter from "../draft/DraftLetter";
import FileSend from "../FileSend";
import {ApiRoutes} from '../../../../config/ApiRoutes';
import LoadingView from "../../../common/LoadingView";
import FileDetails from "./Views/FileDetails";
import FileMovements from "./Views/FileMovements";
import FileEnclosures from "./Views/FileEnclosures";
import FileDrafts from "./Views/FileDrafts";
import FileApplicationDetails from "./Views/FileApplicationDetails";
import FileSiteVerifications from "./Views/FileSiteVerifications";
import FileDraftPermits from "./Views/FileDraftPermits";
import FileDraftRejects from "./Views/FileDraftRejects";
import FileDraftCancels from "./Views/FileDraftCancels";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    zIndex: 1000,
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

class FileView extends Component {
  state = {
    file: [],
    menus: [],
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
          let data = res.data;
          if (data.status === true)
            this.setState({file: data.data.file, menus: data.data.menus, loading: false});
          else
            this.setState({error: true});
          this.props.doLoad(false);
          console.log('file data: ', res);
        })
        .catch(err => {
          console.log("file", err);

          this.props.doLoad(false);
          this.setState({error: true, loading: false});
        });
  }

  handleItemClick = (name) => {
    const {history} = this.props;
    if (this.state.file.id)
      history.push("/e-office/file/" + this.state.file.id + "/" + name);
  };

  render() {
    const {classes} = this.props;
    const {loading} = this.state;

    const view = (
        <>
          <FileMenuLeft click={this.handleItemClick} menus={this.state.menus}/>
          <FileMenuRight click={this.handleItemClick} menus={this.state.menus}/>
          <main className={classes.content} style={{marginRight: '220px'}}>
            <Grid item xs={12} md={12} lg={12}>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/details"}
                     render={(props) => <FileDetails {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/movements"}
                     render={(props) => <FileMovements {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/enclosures"}
                     render={(props) => <FileEnclosures {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/drafts"}
                     render={(props) => <FileDrafts {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/application-details"}
                     render={(props) => <FileApplicationDetails {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/site-verifications"}
                     render={(props) => <FileSiteVerifications {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/draft-permits"}
                     render={(props) => <FileDraftPermits {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/draft-rejects"}
                     render={(props) => <FileDraftRejects {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/draft-cancels"}
                     render={(props) => <FileDraftCancels {...props} file={this.state.file}/>}/>
              <Route exact path={OfficeRoutes.FILE_DETAIL_ROUTE(this.state.file.id) + "/view/notesheets"}
                     render={(props) => <NoteSheetView {...props} file={this.state.file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/draft"}
                     render={(props) => <DraftPermit {...props} file={this.state.file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/reject"}
                     render={(props) => <DraftLetter {...props} file={this.state.file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL + "/send"}
                     render={(props) => <FileSend {...props} doLoad={this.props.doLoad}
                                                  file={this.state.file}/>}/>
              <Route path={OfficeRoutes.FILE_DETAIL} exact
                     render={(props) => <NoteSheetView {...props} file={this.state.file}/>}/>
            </Grid>
          </main>
        </>
    );
    return (
        <Grid container className={classes.container}>
          <div className={classes.root}>
            {loading ? <LoadingView/> : view}
          </div>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(FileView));