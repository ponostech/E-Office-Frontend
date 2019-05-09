import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import GMapDialog from "../../../../components/GmapDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import OfficeSnackbar from "../../../../components/OfficeSnackbar";
import { HotelService } from "../../../../services/HotelService";
import HotelApplicationDialog from "../../../common/HotelApplicationDialog";
import SendDialog from "../../../common/SendDialog";
import SubmitDialog from "../../../../components/SubmitDialog";
import { DESK } from "../../../../config/routes-constant/OfficeRoutes";
import LoadingView from "../../../common/LoadingView";
import LoadingDialog from "../../../common/LoadingDialog";
import moment from "moment";
import { StaffService } from "../../../../services/StaffService";
import { FileService } from "../../../../services/FileService";


const styles = {
  button: {},
  actionIcon: {}
};
let timeout = null;

class HotelNewList extends React.Component {
  hotelService = new HotelService();
  staffService = new StaffService();
  fileService = new FileService();

  state = {
    openAssignment: false,
    openDetail: false,
    openMap: false,
    openTakeFile: false,

    hotels: [],
    application: null,
    file: null,

    submit: false,
    takeMessage: "",
    errorMessage: "",
    lat: 93,
    lng: 98,

    staffs:[]
  };

  // componentWillUnmount() {
  //   clearTimeout(timeout)
  // }

  componentDidMount() {
    const { doLoad } = this.props;
    doLoad(true);
    Promise.all([this.fetchHotel(),this.fetchStaff()])
      .finally(()=>doLoad(false))

  }
  fetchHotel=()=>{
    this.hotelService.fetch()
      .then(hotels => {
        this.setState({ hotels: hotels });
      })
      .catch(err => {
        this.setState({ errorMessage: err.toString() });
      })
  }
  fetchStaff=()=>{
    this.staffService.fetch(errorMessage => this.setState({ errorMessage }),
      staffs => this.setState({ staffs }))
      .finally(() => console.log("staff request has been made"));
  }

  updateTable = (action, tableState) => {

  };
  openAssignment = (application, event) => {
    this.setState({ file: application.file, openAssignment: true });
  };

  takeFile = (data, event) => {
    this.setState({ openTakeFile: true, file: data.file });

  };
  confirmTake = (e) => {
    const { file } = this.state;
    const { history } = this.props;
    this.setState({ openTakeFile: false });
    this.setState({ submit: true });

    let self = this;
    self.fileService.takeFile(file.id,
      errorMessage => self.setState({ errorMessage }),
      takeMessage => {
        self.setState({ takeMessage });
        timeout = setTimeout(function(handler) {
          history.push(DESK);

        }, 3000);

      })
      .finally(() => {
        self.setState({ submit: false });
      });
  };
  sendFile = (fileId, receipientId) => {
    this.setState({ openAssignment: false, submit: true });
    this.fileService.sendFile(fileId, receipientId, errorMessage => this.setState({ errorMessage }),
      takeMessage => {
        this.setState({ takeMessage });
        setTimeout(function(handler) {
          window.location.reload();
        }, 3000);
      }).finally(() => this.setState({  submit: false }));
  };

  render() {
    const { classes } = this.props;
    const { hotels } = this.state;
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 10,
      serverSide: false
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


      }, {
        name: "created_at",
        label: "DATE",
        options: {
          customBodyRender: (date) => {
            return moment(date).format('Do MMMM YYYY')
          }
        }
      }, {
        name: "name",
        label: "SHOP NAME"
      },  {
        owner: "owner",
        label: "DETAILS",
        options: {
          customBodyRender: (value, tableMeta, updatedValue) => {
            const {rowIndex} = tableMeta;
            const data = this.state.hotels[rowIndex];
            const owner = data.owner;
            const owner_address = data.owner_address;
            const address = data.address;
            const phone = data.phone;
            return (
              <ul style={{listStyleType: "none", padding: 0}}>
                <li><strong>Applicant: </strong>{owner}</li>
                <li><strong>Owner Address: </strong>{owner_address}</li>
                <li><strong>Proposed Location: </strong>{address}</li>
                <li><strong>Mobile: </strong>{phone}</li>
              </ul>
            )
          }
        }
      },

      {
        name: "name",
        label: "Name of Shop",
        address: "address",
        options: {
          display: "excluded",
          searchable: true
        }
      },
      {
        name: "action",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.hotels[rowIndex];
            const lat = Number(data.latitude);
            const lng = Number(data.longitude);

            return (
              <>
                <IconButton onClick={e => this.setState({openMap: true, lat: lat, lng: lng})}>
                  <Icon fontSize="small" className={classes.actionIcon}>pin_drop</Icon>
                </IconButton>
                <Tooltip title={"Click here to view details of application"}>
                  <IconButton className={classes.button} color="primary" size="small"
                              aria-label="View Details"
                              onClick={e => this.setState({ application: data })}>
                    <Icon fontSize="small" className={classes.actionIcon}>remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to send this file"}>
                  <IconButton variant="contained" className={classes.button} color="secondary"
                              size="small" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small" className={classes.actionIcon}>send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to call this file"}>
                  <IconButton variant="contained" className={classes.button} color="primary"
                              size="small" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small" className={classes.actionIcon}>drag_indicator</Icon>
                  </IconButton>
                </Tooltip>
              </>

            );
          }
        }
      }

    ];

    let table = <LoadingDialog/>;
    if (!this.state.loading)
      table = <MUIDataTable
        title={"Hotel/Lodging LICENSE: List of New Application"}
        data={hotels}
        columns={tableColumns}
        options={tableOptions}
      />;

    return (
      <>
        <Grid item xs={12}>
          {table}
        </Grid>
        <GMapDialog viewMode={true} open={this.state.openMap} lat={this.state.lat} lng={this.state.lng}
                    onClose={() => this.setState({ openMap: false })}
                    isMarkerShown={true}
        />
        <SendDialog open={this.state.openAssignment} onSend={this.sendFile.bind(this)}
                    onClose={e => this.setState({ openAssignment: false })}
                    staffs={this.state.staffs}
                    file={this.state.file}/>

        <ConfirmDialog primaryButtonText={"Call"} title={"Confirmation"} message={"Do you want to call this file ?"}
                       onCancel={() => this.setState({ openTakeFile: false })} open={this.state.openTakeFile}
                       onConfirm={this.confirmTake.bind(this)}/>

        <SubmitDialog open={this.state.submit} title={"CALL FILE"} text={"Calling File ..."}/>

        <OfficeSnackbar variant={"success"} message={this.state.takeMessage}
                        onClose={e => this.setState({ takeMessage: "" })} open={Boolean(this.state.takeMessage)}/>

        <OfficeSnackbar variant={"error"} message={this.state.errorMessage}
                        onClose={e => this.setState({ errorMessage: "" })}
                        open={Boolean(this.state.errorMessage)}/>
      </>
    );
  }
}

export default withStyles(styles)(HotelNewList);
