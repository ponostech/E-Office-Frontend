import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  List,
  ListSubheader,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import DetailViewRow from "../../../common/DetailViewRow";
import React, { Component } from "reactn";
import Divider from "@material-ui/core/Divider";
import { ApplicationResolver } from "../../dialog/common/ApplicationResolver";
import { FILLABLE_TYPE, WIDGET_TYPE } from "../../../admin/form-builder/constant";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: "auto",
    height: "auto"
  }
};

class ConfirmVerification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strings: [],
      passports: [],
      coordinates: [],
      lat: null,
      lng: null,
      images: [],
      files: []
    };
  }

  componentDidMount() {
    if (this.props.siteVerification) {
      this.setData(this.props.siteVerification)
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.siteVerification)
      this.setData(nextProps.siteVerification)
  }

  setData = (siteVerification) => {
    const { formData, formElements } = siteVerification;
    let strings = [], passports = [], coordinates = [], images = [], files = [];

    Object.entries(formElements).forEach(([key, config]) => {
      switch (config.type) {
        case WIDGET_TYPE.RADIO:
        case WIDGET_TYPE.NUMBER_FIELD:
        case WIDGET_TYPE.SWITCH:
        case WIDGET_TYPE.TEXT_FIELD:
        case WIDGET_TYPE.CHECKBOX:
          strings.push({
            label: config.label,
            value: formData[key] ? formData[key] : ""
          });
          break;
        case WIDGET_TYPE.SELECT:
          strings.push({
            label: config.label,
            value: formData[key] ? formData[key].label : "NA"
          });
          break;
        case WIDGET_TYPE.DATE_PICKER:
          strings.push({
            label: config.label,
            value: moment(formData[key]).format("Do MMM YYYY")
          });
          break;
        case FILLABLE_TYPE.PASSPORT:
          passports.push({
            label: config.label,
            location: formData[key]
          });
          break;
        case WIDGET_TYPE.COORDINATE:
          coordinates.push({
            label: config.label,
            latitude: formData[key] ? formData[key].latitude : null,
            longitude: formData[key] ? formData[key].longitude : null
          });
          break;
        case WIDGET_TYPE.IMAGE_LIST:
          formData[key] && formData[key].map(item => images.push({
            label: item ? item.name : "NA",
            location: item ? item.path : null
          }));
          break;
        case WIDGET_TYPE.FILE_UPLOAD:
          files.push({
            label: config.label,
            location: formData[key] ? formData[key] : null
          });
          break;
      }
    });

    this.setState({ passports, images, coordinates, files, strings });
  };

  getPassport = () => {
    const { passports } = this.state;
    const { classes } = this.props;
    return (
      Boolean(passports) ?
        <div className={classes.gridRoot}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">Passport</ListSubheader>
            </GridListTile>
            {passports.map(tile => (
              <GridListTile key={tile.location}>
                <img src={tile.location} alt={tile.label}/>
                <GridListTileBar
                  title={tile.name}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.label}`} className={classes.icon}>
                      <Icon>info</Icon>
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div> : null
    );
  };
  getStrings = () => {
    const { strings } = this.state;
    return strings.map(item => <DetailViewRow primary={item.label} secondary={item.value}/>);
  };
  getImageList = () => {
    const { images } = this.state;
    const { classes } = this.props;
    return (
      images.length > 0 ?
        <div className={classes.gridRoot}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
              <ListSubheader component="div">Image List</ListSubheader>
            </GridListTile>
            {images.map(tile => (
              <GridListTile key={tile.location}>
                <img src={tile.location} alt={tile.label}/>
                <GridListTileBar
                  title={tile.label}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                      <Icon>info</Icon>
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div> : null
    );
  };
  getFiles = () => {
    const { files } = this.state;
    return <>
      <Typography paragraph={true} variant={"h6"}>Attachments</Typography>
      {files.map(file => (
        <DetailViewRow secondary={file.label}>
          <IconButton onClick={event => window.open(file.location, "_blank")}>
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
        </DetailViewRow>
      ))}
    </>;
  };
  getCoordinate = () => {
    const { coordinates } = this.state;
    return <List>
      <Typography paragraph={true} variant={"h6"}>Coordinates</Typography>
      {coordinates.map(latLng => (
        <DetailViewRow primary={latLng.label} secondary={`lat: ${latLng.latitude} Lng:${latLng.longitude}`}>
          <IconButton onClick={event => this.setState({ lat: latLng.latitude, lng: latLng.longitude, openMap: true })}>
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
        </DetailViewRow>
      ))}
    </List>;
  };
  handleConfirm = () => {
    const { application, siteVerification, confirmVerification } = this.props;
    const { formElements, formData } = siteVerification;
    let url = "site-verifications/" + application.id;
    let type = application.file.fileable_type;
    confirmVerification(url, type, formData, formElements);
  };

  render() {
    const { application, siteVerification, onBack } = this.props;
    const { passports, coordinates, files, images, strings } = this.state;

    const rows = ApplicationResolver(application);
    if (siteVerification) {

      return (
        <Grid container={true} spacing={3}>
          <Grid item={true} md={4}>
            <Card>
              <CardHeader title={"Application Details"}/>
              <Divider component={"div"}/>
              <CardContent>
                <List>
                  {rows.map((row, index) =>
                    <DetailViewRow key={index} primary={row.name}
                                   secondary={typeof row.value === "object" ? "object" : row.value}/>
                  )}
                </List>
              </CardContent>
            </Card>

          </Grid>
          <Grid item={true} md={8}>
            <Card>
              <CardHeader title={"Site Verification Detail"}/>
              <CardContent>
                <Grid container={true}>
                  <Grid item={true} md={6} sm={12} lg={6}>
                    {passports.length > 0 && this.getPassport()}
                    {strings.length > 0 && this.getStrings()}
                    {coordinates.length > 0 && this.getCoordinate()}
                    {files.length > 0 && this.getFiles()}
                  </Grid>
                  <Grid item={true} md={6} sm={12} lg={6}>
                    {images.length > 0 && this.getImageList()}
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
          <Grid item={true} md={12}>
            <Divider component={"div"}/>
          </Grid>

          <Grid item={true} md={12}>
            <Button href={"#"} variant={"contained"} onClick={e => this.handleConfirm()}
                    color={"primary"}>Confirm</Button>
            {"\u00A0 "}
            {"\u00A0 "}
            {"\u00A0 "}
            <Button href={"#"} variant={"contained"} onClick={onBack} color={"inherit"}>Back</Button>
          </Grid>
        </Grid>
      );
    }
  }
}

ConfirmVerification.propTypes = {
  application: PropTypes.object.isRequired,
  siteVerification: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  confirmVerification: PropTypes.func.isRequired
};
export default withStyles(styles)(ConfirmVerification);