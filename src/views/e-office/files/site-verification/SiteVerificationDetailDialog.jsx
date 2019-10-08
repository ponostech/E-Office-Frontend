import React, { Component } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton, List,
  ListSubheader,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import DetailViewRow from "../../common/DetailViewRow";
import { FILLABLE_TYPE, WIDGET_TYPE } from "../../admin/form-builder/constant";
import Grid from "@material-ui/core/Grid";
import GMapDialog from "../../../../components/GmapDialog";
import moment from "moment";

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
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  docsItem: {
    cursor: "pointer"
  },
  editor: {
    minHeight: 200
  }
};

class SiteVerificationDetailDialog extends Component {
  state = {
    strings: [],
    passports: [],
    coordinates: [],
    lat: null,
    lng: null,
    images: [],
    files: []
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.verification) {
      const { data, template } = nextProps.verification;
      let strings = [], passports = [], coordinates = [], images = [], files = [];

      Object.entries(template).forEach(([key, config]) => {
        switch (config.type) {
          case WIDGET_TYPE.RADIO:
          case WIDGET_TYPE.NUMBER_FIELD:
          case WIDGET_TYPE.SWITCH:
          case WIDGET_TYPE.TEXT_FIELD:
          case WIDGET_TYPE.CHECKBOX:
            strings.push({
              label: config.label,
              value: data[key] ? data[key] : ""
            });
            break;
          case WIDGET_TYPE.SELECT:
            strings.push({
              label: config.label,
              value: data[key] ? data[key].label : "NA",
            });
            break;
          case WIDGET_TYPE.DATE_PICKER:
            strings.push({
              label:config.label,
              value:moment(data[key]).format("Do MMM YYYY")
            })
            break;
          case FILLABLE_TYPE.PASSPORT:
            passports.push({
              label: config.label,
              location: data[key]
            });
            break;
          case WIDGET_TYPE.COORDINATE:
            coordinates.push({
              label: config.label,
              latitude: data[key] ? data[key].latitude : null,
              longitude: data[key] ? data[key].longitude : null
            });
            break;
          case WIDGET_TYPE.IMAGE_LIST:
            data[key]&&data[key].map(item=>images.push({
              label: item?item.name:"NA",
              location: item ? item.path : null
            }))
            break;
          case WIDGET_TYPE.FILE_UPLOAD:
            files.push({
              label: config.label,
              location: data[key] ? data[key] : null
            });
            break
        }
      });

      this.setState({ passports, images, coordinates, files, strings });
    }
  }

  getPassport = () => {
    const { passports } = this.state;
    const { classes } = this.props;
    return (
      Boolean(passports)?
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
      </div>:null
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
      images.length>0?
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
      </div>:null
    );
  };
  getFiles = () => {
    const { files } = this.state;
    return <>
      <Typography paragraph={true} variant={"h6"}>Attachments</Typography>
      {files.map(file=>(
      <DetailViewRow secondary={file.label}>
        <IconButton onClick={event => window.open(file.location, "_blank")}>
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
      </DetailViewRow>
      ) )}
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
    </List>
  };


  render() {
    const { open, onClose, verification, classes } = this.props;
    const { strings, passports, files, images, coordinates,lat,lng,openMap } = this.state;


    return (
      <Dialog fullScreen={true} fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Details of site verification
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>


        <DialogContent>
          <Card>
            <CardContent>
              <Grid container={true}>
                <Grid item={true} md={6} sm={12} lg={6}>
                  {passports.length>0 && this.getPassport()}
                  {strings.length>0 && this.getStrings()}
                  {coordinates.length>0 && this.getCoordinate()}
                  {files.length>0 && this.getFiles()}
                </Grid>
                <Grid item={true} md={6} sm={12} lg={6}>
                  {images.length>0 && this.getImageList()}
                </Grid>
              </Grid>

            </CardContent>
          </Card>

        </DialogContent>

        <Divider component={"li"}/>
        <DialogActions>
          <Button href={"#"} variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>

        <GMapDialog open={openMap} isMarkerShown={true} onClose={()=>this.setState({openMap:false})} lat={lat} lng={lng}/>
      </Dialog>
    );
  }
}

SiteVerificationDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired
};

export default withStyles(styles)(SiteVerificationDetailDialog);