import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import GMapDialog from "../../../../components/GmapDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { BannerService } from "../../../../services/BannerService";
import SendDialog from "../../../common/SendDialog";
import { FileService } from "../../../../services/FileService";
import { NEW_BANNER } from "../../../../config/routes-constant/OfficeRoutes";
import SubmitDialog from "../../../../components/SubmitDialog";
import { withRouter } from "react-router-dom";

const styles = {
  button: {},
  actionIcon: {}
};

class BannerNewList extends React.Component {
  bannerService = new BannerService();
  fileService = new FileService();

  state = {
    banners: [],
    file: null,

    submit: false,
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,

    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98
  };

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);

    this.bannerService.fetch()
      .then(banners => {
        this.setState({ banners });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
      .finally(() => {
        doLoad(false);
      });
  }

  openAssignment = (file) => {
    this.setState({ openAssignment: true, file });
  };
  takeFile = (file) => {
    this.setState({ openTakeFile: true, file });
  };
  confirmTake = (e) => {
    const { file } = this.state;
    const { history } = this.props;
    const self = this;
    this.setState({ openTakeFile: false, submit: true });
    this.fileService.takeFile(file.id,
      errorMessage => this.setState({ errorMessage }),
      takeMessage => {
        setTimeout(function(handler) {
          self.setState({ takeMessage });
          history.push(NEW_BANNER);
        }, 2000);
      })
      .finally(() => this.setState({ submit: false }));
  };

  viewDetail = (id) => {
    this.setState({ openDetail: true });
  };
  closeDetail = () => {
    this.setState({ openDetail: false });
  };

  render() {
    const { classes } = this.props;
    const { banners } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.banners[rowIndex];
            return (
              <div>
                <Tooltip title={"Click here to view details"}>
                  <IconButton className={classes.button} color="primary" size="small"
                              aria-label="View Details"
                              onClick={e => this.setState({ banner: data.file, openDetail: true })}>
                    <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to send this file"}>
                  <IconButton variant="contained" className={classes.button} color="secondary"
                              size="small" onClick={e=>this.setState({openAssignment:true,file: data.file})}>
                    <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to call this file"}>
                  <IconButton variant="contained" className={classes.button} color="primary"
                              size="small" onClick={this.takeFile.bind(this, data.file)}>
                    <Icon fontSize="small" className={classes.actionIcon}>drag_indicator</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        }
      }, {
        name: "created_at",
        label: "DATE"
      }, {
        name: "file",
        label: "FILE NO.",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.number
            );
          }
        }
      }, {
        name: "file",
        label: "SUBJECT",
        options: {
          customBodyRender: (file, tableMeta, updateValue) => {
            return (
              file.subject
            );
          }
        }
      }, {
        name: "name",
        label: "APPLICANT"
      }, {
        name: "advertisement_type",
        label: "ADVERTISEMENT TYPE"
      }

    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"BANNER: List of New Application"}
            data={banners}
            columns={tableColumns}
            options={tableOptions}
          />
        </Grid>

        <SendDialog close={e => this.setState({ openAssignment: false, file: null })} file={this.state.file}
                    open={this.state.openAssignment}/>

        <GMapDialog open={this.state.openMap} viewMode={true} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <SubmitDialog open={this.state.submit} title={"Call file"} text={"File is calling ..."}/>
        <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                       message={"Do you want to take this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>
        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>
        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })}
                        open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(BannerNewList));
