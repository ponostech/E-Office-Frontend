import React, { Component } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  List,
  Slide,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import LoadingView from "../../../common/LoadingView";
import PropTypes from "prop-types";
import DetailViewRow from "../../common/DetailViewRow";
import { getApplicationTitle } from "./common/ApplicationResolver";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImposedFineDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: null,
      reason: "",
      amount: 0,

      applicationError: "",
      reasonError: "",
      amountError: ""
    };
  }

  componentDidMount() {
    this.setState({ application: this.props.application });
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  clear = () =>
    this.setState({
      application: null,
      reason: "",
      amount: 0
    });

  imposeFine = () => {
    const { application } = this.props;
    const { reason, amount } = this.state;
    let data = {
      challanable_id: application.id,
      challanable_type: application.file.fileable_type,
      detail: reason,
      amount
    };
    this.clear();
    this.props.imposeFine(data);
  };

  onBlur = (name, value) => {
    switch (name) {
      case "application":
        value
          ? this.setState({ applicationError: "" })
          : this.setState({ applicationError: "Application is required" });
        break;
      case "reason":
        value
          ? this.setState({ reasonError: "" })
          : this.setState({ reasonError: "Reason is required" });
        break;
      case "amount":
        value
          ? this.setState({ amountError: "" })
          : this.setState({ amountError: "Amount is required" });
        break;
      default:
        break;
    }
  };

  render() {
    const { application, reason, amount, loading } = this.state;
    const { reasonError, amountError } = this.state;
    const { open, onClose, classes } = this.props;

    let val = getApplicationTitle(application);
    let content = (
      <>
        <Grid container={true} spacing={2}>
          <Grid sm={12} md={12} item={true}>
            <List>
              {application && (
                <DetailViewRow primary={val.title} secondary={val.subtitle} />
              )}
            </List>
          </Grid>
          <Grid sm={12} md={12} item={true}>
            <TextField
              name={"amount"}
              InputProps={{
                inputProps: {
                  min: 0
                },
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Icon color={"action"} fontSize={"small"}>
                      account_balance_wallet
                    </Icon>
                  </InputAdornment>
                )
              }}
              type={"number"}
              value={amount}
              margin={"dense"}
              fullWidth={true}
              variant={"outlined"}
              onChange={event => this.onChange("amount", event.target.value)}
              label={"Amount"}
              required={true}
              onBlur={event => this.onBlur("amount", event.target.value)}
              error={Boolean(amountError)}
              helperText={amountError}
            />
          </Grid>
          <Grid sm={12} md={12} item={true}>
            <TextField
              name={"reason"}
              value={reason}
              multiline={true}
              rows={10}
              margin={"dense"}
              fullWidth={true}
              variant={"outlined"}
              onChange={event => this.onChange("reason", event.target.value)}
              label={"Reason"}
              required={true}
              onBlur={event => this.onBlur("reason", event.target.value)}
              error={Boolean(reasonError)}
              helperText={reasonError}
            />
          </Grid>
        </Grid>
      </>
    );
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              href={"#"}
              color="inherit"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              Impose Fine
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Card>
            <CardContent>{loading ? <LoadingView /> : content}</CardContent>
          </Card>
        </DialogContent>
        <Divider component={"div"} />
        <DialogActions>
          <Button
            disabled={!Boolean(amount) || !Boolean(reason)}
            href={"#"}
            variant={"outlined"}
            color={"primary"}
            onClick={event => this.imposeFine()}
          >
            Impose Fine
          </Button>
          <Button
            href={"#"}
            variant={"outlined"}
            color={"secondary"}
            onClick={onClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ImposedFineDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imposeFine: PropTypes.func.isRequired,
  application: PropTypes.object.isRequired
};

export default withStyles(styles)(ImposedFineDialog);
