import React from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { AdvertiserService } from "../../../../services/AdvertiserService";
import ApplicationState from "../../../../utils/ApplicationState";
import ConfirmDialog from "../../../../components/ConfirmDialog";

const styles = {
  button: {},
  actionIcon: {}
};

class AdvertiserNewList extends React.Component {
  state = {
    advertisers: []
  };
  advertiserService = new AdvertiserService();

  componentDidMount() {
    this.props.doLoad(true);
    this.getData();
  }

  getData() {
    this.advertiserService.fetch(ApplicationState.NEW_APPLICATION, errorMessage => this.setState({ errorMessage }),
      advertisers => this.setState({ advertisers }))
      .finally(() => {
        this.props.doLoad(false);
      });
  }

  viewDetail=(value,event)=>{

  }
  openAssignment=(value,event)=>{

  }
  takeFile=(value,event)=>{
     this.setState({takeConfirmMessage:"Do you want to take this file?"})
      console.log(value)
  }

  confirmTake=()=>{

  }
  render() {
    const tableOptions = {
      filterType: "checkbox",
      responsive: "scroll",
      rowsPerPage: 15,
      serverSide: false
    };

    const tableColumns = [
      {
        name: "id",
        label: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const data = this.state.advertisers[rowIndex];
            return (
              <>
                <Tooltip title={"Click her to view detail of file"}>
                  <IconButton color="primary" size="small"
                              aria-label="View Details" onClick={this.viewDetail.bind(this, data)}>
                    <Icon fontSize="small">remove_red_eye</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to assign this file to staff"}>
                  <IconButton variant="contained" color="secondary"
                              size="small" onClick={this.openAssignment.bind(this, data)}>
                    <Icon fontSize="small">send</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Click here to take this file"}>
                  <IconButton variant="contained" color="primary"
                              size="small" onClick={this.takeFile.bind(this, data)}>
                    <Icon fontSize="small">desktop_mac</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      },
      {
        name: "name",
        label: "APPLICANT"
      },
      {
        name: "type",
        label: "APPLICANT TYPE"
      },
      {
        name: "address",
        label: "ADDRESS"
      },
      {
        name: "created_at",
        label: "DATE OF APPLICATION"
      }
    ];

    return (
      <>
        <Grid item xs={12}>
          <MUIDataTable
            title={"ADVERTISER: List of New Application"}
            data={this.state.advertisers}
            columns={tableColumns}
            options={tableOptions}
          />

          <ConfirmDialog onCancel={(e)=>this.setState({takeConfirmMessage:""})} open={Boolean(this.state.takeConfirmMessage)} onConfirm={this.confirmTake}
                         message={this.state.takeConfirmMessage}/>

        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(AdvertiserNewList);
