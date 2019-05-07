import React from "react";
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import {Icon} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Assignment from "../ApplicationAssignmentDialog";
import GMapDialog from "../../../../components/GmapDialog";
import HoardingDetailDialog from "../../../advertiser/hoarding/HoardingDetailDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import {ShopService} from "../../../../services/ShopService";
import ApplicationState from "../../../../utils/ApplicationState";
import LoadingView from "../../../common/LoadingView";

const styles = {
  button: {},
  actionIcon: {},
};

class ShopNewList extends React.Component {
  shopService = new ShopService();
  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,
    detailData: [],
    shops: [],
    shop: {},
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98,
    loading: true,
  };

  componentDidMount() {
    const {doLoad} = this.props;
    doLoad(true);
    this.shopService.fetch(ApplicationState.NEW_APPLICATION)
      .then(shops => {
        this.setState({shops: shops});
      })
      .catch(err => {
        this.setState({errorMessage: err.toString()});
      })
      .finally(() => {
        this.setState({loading: false})
        doLoad(false);
      });
  }
  openAssignment = (id) => {
    this.setState({openAssignment: true});
  };
  takeFile = (data) => {
    this.setState({openTakeFile: true, fileDetail: data.file});
  };
  confirmTake = (e) => {
    const {fileDetail} = this.state;
    console.log(fileDetail);
    this.setState({openTakeFile: false});
    this.setState({takeMessage: "You have taken the file"});
  };
  closeAssignment = () => {
    this.setState({openAssignment: false});
  };

  viewDetail = (id) => {
    this.setState({openDetail: true});
  };
  closeDetail = () => {
    this.setState({openDetail: false});
  };

  render() {
    const {classes} = this.props;
    const {shops} = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false,
    };

    const tableColumns = [
      {
        name: "file",
        label: "FILE NUMBER",
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
      },
      {
        name: "owner",
        label: "DETAILS",
        options: {
          customBodyRender: (value, tableMeta, updatedValue) => {
            const {rowIndex} = tableMeta;
            const data = this.state.shops[rowIndex];
            const shopName = data.name;
            const address = data.address;
            return (
              <ul style={{listStyleType: "none", padding: 0}}>
                <li><strong>Applicant: </strong>{value}</li>
                <li><strong>Shop Name: </strong>{shopName}</li>
                <li><strong>Proposed Location: </strong>{address}</li>
              </ul>
            )
          }
        }
      },
      {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            return moment(date).format('Do MMMM YYYY')
          }
        }
      },
      {
        name: "name",
        label: "Name of Shop",
        options: {
          display: 'excluded',
          searchable: true,
        }
      },
      /*{
        name: "shop",
        label: "LOCATION",
        options: {
          customBodyRender: (shop, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.shops[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);

            let view = (
              <Tooltip title={"Click here to view location"}>
                <IconButton onClick={e => this.setState({ openMap: true,lat:lat ,lng:lng})}>
                  <PinDrop/>
                </IconButton>
              </Tooltip>
            );
            return (
              view
            );
          }
        }
      },*/
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const {rowIndex} = tableMeta;
            const data = this.state.shops[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);

            return (
              <div>
                <IconButton className={classes.button} color="primary" size="small"
                            aria-label="View Details"
                            onClick={e => this.setState({shop: data, openDetail: true})}>
                  <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="secondary"
                            size="small" onClick={this.openAssignment.bind(this, value)}>
                  <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                </IconButton>
                <IconButton variant="contained" className={classes.button} color="primary"
                            size="small" onClick={this.takeFile.bind(this, data)}>
                  <Icon fontSize="small" className={classes.actionIcon}>desktop_mac</Icon>
                </IconButton>
                <IconButton onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                  <Icon fontSize="small" className={classes.actionIcon}>pin_drop</Icon>
                </IconButton>
              </div>
            );
          }
        }
      },

    ];

    let table = <LoadingView/>;
    if (!this.state.loading)
      table = <MUIDataTable
        title={"HOTEL & LODGING LICENSE: List of Under Process Application"}
        data={shops}
        columns={tableColumns}
        options={tableOptions}
      />;

    return (
      <>
        <Grid item xs={12}>
          {table}
        </Grid>
        <HoardingDetailDialog
          hoarding={this.state.shop}
          open={this.state.openDetail} onClose={(e) => this.setState({openDetail: false})}/>

        <Assignment open={this.state.openAssignment} close={this.closeAssignment} data={this.state.detailData}
                    props={this.props} staffs={this.state.staffs}/>

        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({openMap: false})}
                    isMarkerShown={true}
        />

        <ConfirmDialog primaryButtonText={"Take"} title={"Confirmation"}
                       message={"Do you want to take this file ?"}
                       onCancel={() => this.setState({openTakeFile: false})} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>

        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({takeMessage: ""})} open={Boolean(this.state.takeMessage)}/>

        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({errorMessage: ""})}
                        open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(ShopNewList);
