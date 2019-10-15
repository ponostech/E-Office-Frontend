import React ,{Component,useState} from "reactn";
import { HoardingService } from "../../../../services/HoardingService";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Typography, withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { KioskService } from "../../../../services/KioskService";
import ApplicationState from "../../../../utils/ApplicationState";

const styles = {
  appBar: {
    position: "relative"
  },
  actionsContainer: {
    marginBottom: 6
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const HoardingList = ({ selectedHoardings, onClick }) => {
  const [hoardings, setHoardings] = useState([]);
  new HoardingService().fetch(ApplicationState.APPROVED_APPLICATION, errorMsg => this.setGlobal({ errorMsg }),
    data => setHoardings(data))
    .finally(() => this.setGlobal({ loading: false }));

  return (
    <List>
      {hoardings.map((item, i) =>
        <ListItem key={i}>
          <ListItemText title={item.id} secondary={`${item.location}(${item.localCouncil.name})`}/>
          <ListItemSecondaryAction>
            <IconButton onClick={event => onClick(item)}>
              <Icon color={selectedHoardings.find(i => item.id) ? "primary" : "action"}>check</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
    </List>
  );
};
const KioskList = ({ selectedKiosks, onClick }) => {
  const [kiosks, setKiosks] = useState([]);
  new KioskService().fetch(ApplicationState.APPROVED_APPLICATION, errorMsg => this.setGlobal({ errorMsg }),
    data => setKiosks(data))
    .finally(() => this.setGlobal({ loading: false }));
  return (
    <List>
      {kiosks.map((item, i) =>
        <ListItem key={i}>
          <ListItemText title={item.id} secondary={`${item.location}(${item.localCouncil.name})`}/>
          <ListItemSecondaryAction>
            <IconButton onClick={event => onClick(item)}>
              <Icon color={selectedKiosks.find(i => item.id == i.id) ? "primary" : "action"}>check</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
    </List>
  );
};

class AdvertisementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "hoarding",
      selectedHoardings: [],
      selectedKiosks: []
    };
  }

  handleSelect = () => {
    const { selectedKiosks, selectedHoardings } = this.state;
    const { onAdvertisementSelect } = this.props;

    onAdvertisementSelect(selectedHoardings, selectedKiosks);
  };

  onHoardingClick = (hoarding) => {
    let { selectedHoardings } = this.state;
    const found = selectedHoardings.find(item => item.id === hoarding.id);
    if (found) {
      let newData = selectedHoardings.find(item => item.id !== hoarding.id);
      this.setState({ selectedHoardings: newData });
    } else {
      this.setState({ selectedHoardings: [...selectedHoardings, hoarding] });
    }
  };

  onKioskClick = (kiosk) => {
    let { selectedKiosks } = this.state;
    const found = selectedKiosks.find(item => item.id === kiosk.id);
    if (found) {
      let newData = selectedKiosks.find(item => item.id !== kiosk.id);
      this.setState({ selectedKiosks: newData });
    } else {
      this.setState({ selectedKiosks: [...selectedKiosks, kiosk] });
    }

  };

  render() {
    const { onClose, open,classes } = this.props;
    const { tabValue, selectedKiosks, selectedHoardings } = this.state;
    return (
      <Dialog maxWidth={"md"} open={open} TransitionComponent={Transition} onClose={onClose} fullWidth={true}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close" href={"#"}>
              <Icon>close</Icon>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Select Advertisement
            </Typography>
            <Button href={"#"} onClick={this.props.onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
          <Tabs
            variant={"fullWidth"}
            component={"div"}
            value={tabValue}
            onChange={(event, val) => this.setState({ tabValue: val })}
            aria-label="Disabled tabs example"
          >
            <Tab href={"#"} label="Hoarding" value={"hoarding"}/>
            <Tab href={"#"} label="Kiosk" value={"kiosk"}/>
          </Tabs>
        </AppBar>
        <DialogContent>


          {tabValue === "hoarding" && <HoardingList selectedHoardings={selectedHoardings} onClick={this.onHoardingClick}/>}
          {tabValue === "kiosk" && <KioskList selectedKiosks={selectedKiosks} onClick={this.onKioskClick}/>}
        </DialogContent>
        <DialogActions>
          <Button disabled={!Boolean(selectedHoardings) || !Boolean(selectedKiosks)} href={"#"} variant={"outlined"}
                  color={"primary"}
                  onClick={e => this.handleSelect()}>Confirm</Button>
          <Button href={"#"} variant={"outlined"}
                  color={"secondary"}
                  onClick={e => onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AdvertisementView.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  onAdvertisementSelect: PropTypes.func.isRequired
};
export default withStyles(styles)(AdvertisementView);