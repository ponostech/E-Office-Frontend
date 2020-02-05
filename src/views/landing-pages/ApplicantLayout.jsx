import React, { Component } from "reactn";
import { Card, CardContent } from "@material-ui/core";
import CheckLicense from "./license-checking/CheckLicense";
import ApplicantDashboard from "./ApplicantDashboard";
import { LicenseService } from "../../services/LicenseService";

class ApplicantLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      shops: [],
      hotels: [],
      banners: [],
      notFoundError: "",
      search: true
    };
    this.licenseService = new LicenseService();
  }

  refresh = () => {
    const { phone } = this.state;
    this.checkApplication(phone);
  };

  checkApplication = phone => {
    this.setState({ phone, submit: true });
    this.licenseService
      .getApplications(
        phone,
        errorMsg => this.setGlobal({ errorMsg }),
        data =>
          this.setState({
            search: false,
            banners: data.shops,
            hotels: data.hotels,
            shops: data.shops
          })
      )
      .finally(() => this.setState({ submit: false }));
  };

  render() {
    const { search, submit, phone } = this.state;
    return (
      <Card>
        <CardContent style={{ padding: 0 }}>
          {Boolean(search) ? (
            <CheckLicense checking={submit} onCheck={this.checkApplication} />
          ) : (
            <ApplicantDashboard refresh={this.refresh} phone={phone} />
          )}
        </CardContent>
      </Card>
    );
  }
}

export default ApplicantLayout;
