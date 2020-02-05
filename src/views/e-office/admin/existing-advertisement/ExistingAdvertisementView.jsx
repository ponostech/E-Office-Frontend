import React, { Component } from "reactn";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import ExistingKioskList from "./ExistingKioskList";
import ExistingHoardingList from "./ExistingHoardingList";
import HoardingDialog from "./HoardingDialog";
import KioskDialog from "./KioskDialog";

class ExistingAdvertisementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "hoarding",

      openKiosk: false,
      openHoarding: false
    };
  }

  componentDidMount() {
    this.setGlobal({ loading: false });
  }

  createHoarding = hoarding => {};
  createKiosk = kiosk => {};

  displayError = errorMsg => this.setGlobal({ errorMsg });

  onHoardingEdit = hoarding => {};
  onHoardingDelete = Hoarding => {};
  onKioskEdit = kiosk => {};
  onKioskDelete = kiosk => {};
  openCreate = () => {
    const { tabValue } = this.state;
    if (tabValue === "hoarding") {
      this.setState({ openHoarding: true });
    } else {
      this.setState({ openKiosk: true });
    }
  };
  render() {
    const { tabValue, openHoarding, openKiosk } = this.state;

    return (
      <Card>
        <AppBar position={"relative"} color={"inherit"}>
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Existing Advertisement
            </Typography>
            <Button
              onClick={e => this.openCreate()}
              variant={"outlined"}
              href={"#"}
              color="primary"
            >
              New Advertisement
            </Button>
          </Toolbar>
          <Tabs
            component={"div"}
            value={tabValue}
            onChange={(event, val) => this.setState({ tabValue: val })}
            aria-label="Disabled tabs example"
          >
            <Tab href={"#"} label="Hoarding" value={"hoarding"} />
            <Tab href={"#"} label="Kiosk" value={"kiosk"} />
          </Tabs>
        </AppBar>
        <CardContent>
          {tabValue === "hoarding" && (
            <ExistingHoardingList
              onError={this.displayError}
              onEdit={this.onKioskEdit}
              onDelete={this.onKioskDelete}
            />
          )}
          {tabValue === "kiosk" && (
            <ExistingKioskList
              onError={this.displayError}
              onDelete={this.onHoardingDelete}
              onEdit={this.onHoardingEdit}
            />
          )}
        </CardContent>

        <HoardingDialog
          onClose={() => this.setState({ openHoarding: false })}
          open={openHoarding}
          onCreate={this.createHoarding}
        />
        <KioskDialog
          onClose={() => this.setState({ openKiosk: false })}
          open={openKiosk}
          onCreate={this.createKiosk}
        />
      </Card>
    );
  }
}

export default ExistingAdvertisementView;
