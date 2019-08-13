import React, { Component } from "reactn";
import { Card, CardHeader, Grid, Icon, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { LicenseService } from "../../../services/LicenseService";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import moment from "moment";

import CardContent from "@material-ui/core/CardContent";
import CardIcon from "../../../components/Card/CardIcon";
import OfficeContextMenu from "../../../components/OfficeContextMenu";
import Divider from "@material-ui/core/Divider";
import RenewShopLicenseDialog from "../../shop/RenewShopLicenseDialog";

{/*<Card raised={true} profile={true}>*/
}

{/*  <CardHeader color={"primary"} text={true}>*/
}
{/*    /!*<CardIcon color="primary">*!/*/
}
{/*    /!*  <Icon>content_copy</Icon>*!/*/
}
{/*    /!*</CardIcon>*!/*/
}
{/*    <CardText color={color}>*/
}
{/*    <Typography paragraph={true} variant={"h6"}>License Number: {license.number}</Typography>*/
}
{/*    </CardText>*/
}
{/*  </CardHeader>*/
}
{/*  <CardBody>*/
}
{/*    <Typography paragraph={true}>*/
}
{/*      Application Date: {moment(license.created_at).format("DD MMM YYYY")}*/
}
{/*    </Typography>*/
}
{/*    <Typography paragraph={true} dangerouslySetInnerHTML={{ __html: license.content }}/>*/
}
{/*    <Typography paragraph={true}>*/
}
{/*      {subhead}*/
}
{/*    </Typography>*/
}
{/*  </CardBody>*/
}
{/*</Card>*/
}

const LicenseCard = (props) => {
  const { license } = props;
  const onContextMenuClick = (menu) => {
    switch (menu) {
      case "renew":
        props.onRenew(license);
        break;
      default:
        break
    }
  };
  const menu = {
    icon: <Icon>more_vert</Icon>,
    textOnly: false,
    menuItems: [
      {
        name: "profile",
        icon: <Icon fontSize={"small"}>user</Icon>,
        text: "Download License",
        onClick: onContextMenuClick
      },{
        name: "renew",
        icon: <Icon fontSize={"small"}>refresh</Icon>,
        text: "Renew License/Permit",
        divider:true,
        onClick: onContextMenuClick
      },
      { name: "profile", icon: <Icon fontSize={"small"}>edit</Icon>, text: "My Account", onClick: onContextMenuClick },
      {
        name: "log_out",
        icon: <Icon fontSize={"small"}>power_settings_new</Icon>,
        text: "Log out",
        onClick: onContextMenuClick
      }
    ]
  };
  let color = license.type === "permit" ? "primary" : "warning";
  const subhead = license.type === "permit" ? <Chip color={"primary"} label={license.type}/> :
    <Chip component={"div"} color={"secondary"} label={license.type}/>;
  return (


    <Paper style={{ margin: 10 }}>

      <Card>
        <CardHeader title={"LICENSE NUMBER"} subheader={license.number} action={
          <OfficeContextMenu menu={menu}/>
        }>
        </CardHeader>
        <Divider/>
        <CardContent>
          <Typography paragraph={true}>
            Date of Application: {moment(license.created_at).format("DD MMM YYYY")}
          </Typography>
          <Typography paragraph={true} dangerouslySetInnerHTML={{ __html: license.content }}/>
          <Typography paragraph={true}>
            {subhead}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

const ShopLicensesView = (props) => {
  const { licenses } = props;
  return (
    <>
      {Boolean(licenses) && <Grid style={{ padding: 16 }} container={true} spacing={2}>
        {licenses.map(item =>
          <Grid key={item.id} item={true} md={4} sm={12} xs={12}>
            <LicenseCard onRenew={props.onShopRenew} license={item}/>
          </Grid>
        )}
      </Grid>}
      {licenses.length === 0 && <Typography paragraph={true}>No License is issued</Typography>}
    </>
  );
};

const HotelLicensesView = (props) => {

  const { licenses } = props;
  return (
    <>
      {Boolean(licenses) && <Grid container={true} spacing={2}>
        {licenses.map(item =>
          <Grid key={item.id} item={true} md={3} sm={12} xs={12}>
            <LicenseCard onRenew={props.onHotelRenew} license={item}/>
          </Grid>
        )}
      </Grid>}
      {licenses.length === 0 && <Typography paragraph={true}>No License is issued</Typography>}

    </>
  );
};
const BannerLicensesView = (props) => {
  const { licenses } = props;

  return (
    <>
      {Boolean(licenses) && <Grid container={true} spacing={2}>
        {licenses.map(item =>
          <Grid key={item.id} item={true} md={3} sm={12} xs={12}>
            <LicenseCard onRenew={props.onBannerRenew} license={item}/>
          </Grid>
        )}
      </Grid>}
      {licenses.length === 0 && <Typography paragraph={true}>No License is issued</Typography>}

    </>
  );
};

class LicenseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopLicenses: [],
      hotelLicenses: [],
      bannerLicenses: [],

      openShopRenewDialog:false,
      openHotelRenewDialog:false,
      openBannerRenewDialog:false,

      selectedLicense:null,
      application:false,
      tabValue: "shop"
    };
    this.licenseService = new LicenseService();
  }

  componentDidMount() {
    const { phone } = this.props;
    this.licenseService.getLicenses(phone,
      errorMsg => this.setGlobal({ errorMsg }),
      (shopLicenses, hotelLicenses, bannerLicenses) => this.setState({
        shopLicenses, hotelLicenses, bannerLicenses
      }))
      .finally(() => console.log("get licenses request complete"));
  }

  selectTab = (event, tabValue) => {
    this.setState({ tabValue });
  };

  renewShopLicense=(selectedLicense)=> console.log(selectedLicense);

  submitShopRenewalForm=(application)=> {
    this.setState({openShopRenewDialog:false,submit:true});
  }

  renewHotelLicense=(selectedLicense)=>this.setState({openHotelRenewDialog:true,selectedLicense});

  renewBannerPermit=(selectedLicense)=> this.setState({openBannerRenewDialog:true,selectedLicense});


  render() {
    const { tabValue, shopLicenses, hotelLicenses, bannerLicenses } = this.state;
    const { openShopRenewDialog, openHotelRenewDialog, openBannerRenewDialog, selectedLicense } = this.state;
    return (
      <div>
        <Card>
          <CardContent>
            <Paper>

              <Tabs
                component={"div"}
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.selectTab}
                aria-label="Disabled tabs example"
              >
                <Tab href={"#"} label="Shop" value={"shop"}/>
                <Tab href={"#"} label="Hotel" value={"hotel"}/>
                <Tab href={"#"} label="Banner" value={"banner"}/>
              </Tabs>

              {tabValue === "shop" && <ShopLicensesView onShopRenew={this.renewShopLicense} licenses={shopLicenses}/>}
              {tabValue === "hotel" && <HotelLicensesView onHotelRenew={this.renewHotelLicense} licenses={hotelLicenses}/>}
              {tabValue === "banner" && <BannerLicensesView onBannerRenew={this.renewBannerPermit} licenses={bannerLicenses}/>}
            </Paper>
          </CardContent>
        </Card>

        <RenewShopLicenseDialog onClose={()=>this.setState({openShopRenewDialog:false})}
                                license={selectedLicense}
                                onResubmit={this.submitShopRenewalForm}
                                open={openShopRenewDialog}/>
      </div>
    );
  }
}

LicenseList.propTypes = {
  phone: PropTypes.string.isRequired
};

export default LicenseList;