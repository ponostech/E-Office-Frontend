import React, { Component } from "reactn";
import LoadingView from "../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RateService from "../../../../services/RateService";
import SubmitDialog from "../../../../components/SubmitDialog";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import withStyles from "@material-ui/core/styles/withStyles";
import HoardingRateDialog from "./HoardingRateDialog";
import OtherRateDialog from "./OtherRateDialog";
import HoardingRateEditDialog from "./HoardingRateEditDialog";

const fake = [
  {
    id: 1,
    type: "hoarding",
    display_type: "illuminate",
    land_owner_type: "Private",
    category: "A",
    rate: 10000
  }
];

const styles = theme => ({
  root: {
    height: 380
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(15),
    right: theme.spacing(15)
  }
});

class AdvertisementRateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: fake,
      selectedRate: null,

      confirmDelete: false,
      openHoarding: false,
      openEditHoarding: false,
      openOther: false,
      openEdit: false,
      submit: false,

      submitTitle: "Submit",

      openMenu: false,
      hidden: false
    };
    this.rateService = new RateService();
  }

  componentDidMount() {
    // this.setGlobal({loading:true})
    this.setGlobal({ loading: false });
  }

  handleVisibility = () => {
    this.setState(state => ({
      openMenu: false,
      hidden: !state.hidden
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      openMenu: !state.open
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        openMenu: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      openMenu: false
    });
  };

  onCreate = data => {
    this.setState({
      openHoarding: false,
      openOther: false,
      submitTitle: "Creating Advertisement Rate"
    });
    if (data) {
      this.setState({ submit: true });
      this.rateService
        .create(
          data,
          errorMsg => this.setGlobal({ errorMsg }),
          successMsg => this.setGlobal({ successMsg })
        )
        .finally(() => this.setState({ submit: false }));
    }
  };
  onUpdate = data => {
    this.setState({
      openEdit: false,
      submitTitle: "Updating Advertisement Rate"
    });
    if (data) {
      this.setState({ submit: true });
      this.rateService
        .update(
          data,
          errorMsg => this.setGlobal({ errorMsg }),
          successMsg => this.setGlobal({ successMsg })
        )
        .finally(() => this.setState({ submit: false }));
    }
  };
  deleteRate = () => {
    const { selectedRate } = this.state;
    this.setState({ confirmDelete: false });
    this.setState({ submit: true, submitTitle: "Deleting Advertisement Rate" });
    this.rateService
      .delete(
        selectedRate.id,
        errorMsg => this.setGlobal({ errorMsg }),
        successMsg => this.setGlobal({ successMsg })
      )
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const { rates, hidden, openMenu } = this.state;
    const { classes } = this.props;
    const tableOptions = {
      filterType: "checkbox",
      rowsPerPage: 15
    };

    const tableColumns = [
      {
        name: "type",
        label: "TYPES OF ADVERTISEMENT"
      },
      {
        name: "display_type",
        label: "TYPE OF DISPLAY"
      },
      {
        name: "landowner_type",
        label: "TYPE OF LANDLORD/LANDOWNER"
      },
      {
        name: "category",
        label: "CATEGORY"
      },
      {
        name: "rate",
        label: "RATE",
        options: {
          customBodyRender: (rate, tableMeta) =>
            new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumSignificantDigits: 2
            }).format(rate)
        }
      },
      {
        name: "id",
        label: "ACTION",
        options: {
          customBodyRender: (value, tableMeta) => {
            const { rowIndex } = tableMeta;
            let rate = rates[rowIndex];

            return (
              <>
                <Tooltip title={"Edit"}>
                  <IconButton
                    href={"#"}
                    onClick={event =>
                      this.setState({ openEdit: true, selectedRate: rate })
                    }
                  >
                    <Icon color={"primary"}>edit</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                  <IconButton
                    href={"#"}
                    onClick={event =>
                      this.setState({ confirmDelete: true, selectedRate: rate })
                    }
                  >
                    <Icon color={"primary"}>delete</Icon>
                  </IconButton>
                </Tooltip>
              </>
            );
          }
        }
      }
    ];
    return (
      <>
        {this.global.loading ? (
          <LoadingView />
        ) : (
          <CardContent>
            <MUIDataTable
              title={"Rate of advertisement"}
              data={rates}
              columns={tableColumns}
              options={tableOptions}
            />

            {/*<Fab href={"#"} onClick={event => this.setState({ openCreate: true })} color="primary" aria-label="Add"*/}
            {/*     style={{ position: "fixed", right: 80, bottom: 100 }}>*/}
            {/*  <Icon>add</Icon>*/}
            {/*</Fab>*/}
          </CardContent>
        )}

        <SpeedDial
          ariaLabel="create rate"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={openMenu}
        >
          <SpeedDialAction
            onClick={event => this.setState({ openHoarding: true })}
            icon={<PrintIcon />}
            title={"Hoarding/Kiosk"}
          >
            create hoarding rate
          </SpeedDialAction>
          <SpeedDialAction
            onClick={event => this.setState({ openOther: true })}
            icon={<SaveIcon />}
            title={"Others"}
          >
            create other rate
          </SpeedDialAction>
        </SpeedDial>

        <SubmitDialog
          open={this.state.submit}
          title={this.state.submitTitle}
          text={"Please wait ..."}
        />
        <ConfirmDialog
          onCancel={e => this.setState({ confirmDelete: false })}
          open={this.state.confirmDelete}
          onConfirm={this.deleteRate.bind(this)}
        />

        <HoardingRateDialog
          open={this.state.openHoarding}
          onCreate={this.onCreate.bind(this)}
          onClose={e => this.setState({ openHoarding: false })}
        />

        <HoardingRateEditDialog
          open={this.state.openEditHoarding}
          rate={this.state.selectedRate}
          onUpdate={this.onUpdate}
          onClose={e => this.setState({ openHoarding: false })}
        />
        <OtherRateDialog
          open={this.state.openOther}
          onCreate={this.onCreate.bind(this)}
          onClose={e => this.setState({ openOther: false })}
        />

        {/*<RateEditDialog open={this.state.openEdit} rate={this.state.selectedRate} onClose={this.onUpdate.bind(this)}/>*/}
      </>
    );
  }
}

export default withStyles(styles)(AdvertisementRateView);
