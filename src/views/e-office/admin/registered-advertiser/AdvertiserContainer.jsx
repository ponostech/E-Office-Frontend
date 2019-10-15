import React, { Component,useState } from "reactn";
import {
  Card, CardContent,
  CardHeader,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import AdvertisementView from "./AdvertisementView";
import Paper from "@material-ui/core/Paper";
import { StaffService } from "../../../../services/StaffService";
import Divider from "@material-ui/core/Divider";
import { NEW_ADVERTISER } from "../../../../config/routes-constant/OfficeRoutes";
import { withRouter } from "react-router-dom";
import CreateAdvertiser from "./CreateAdvertiser";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";

const style = {
  root: {
    padding: 30,
    margin: 20
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 2fr"
  },
  verticalLine: {
    width: "2px",
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgba(0, 0, 0, 0.12)"
  },
  component: {
    margin: 3,
    padding: 10,
    display: "flex"
  },
  topMargin: {
    marginTop: 30
  },
  row: {
    display: "flex",
    alignItems: "center"
  }, column: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  },
  detailGrid: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "auto",
    gridTemplateRows:"50px 1fr 1fr"

  },
  detailTitle: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  detailDescription: {
    padding: 20,
    margin: 10,
  },
  detailList: {
    gridColumnStart: 1,
    gridColumnEnd: 3
  }
};

class AdvertiserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertisers: []
    };
    this.advertiserService = new StaffService();
  }

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.advertiserService.fetch(
      errorMsg => this.setGlobal({ errorMsg }),
      advertisers => this.setState({ advertisers }))
      .finally(() => this.setGlobal({ loading: false }));
  }


  render() {
    const { advertisers } = this.state;
    const { onItemClick, onCreate } = this.props;

    return (
      <div style={style.column}>
        <div className={style.row}>

          <TextField variant={"outlined"}
                     placeholder={"Search"}
                     fullWidth={true}
                     InputProps={{
                       startAdornment:
                         <IconButton onClick={event => onCreate()}>
                           <Icon color={"primary"}>add</Icon>
                         </IconButton>,
                       endAdornment: <Icon>search</Icon>
                     }}/>

        </div>
        <Divider style={style.topMargin}/>
        <List style={style.column}>
          {
            advertisers.map((item, i) =>
              <ListItem onClick={event => onItemClick(item)} key={i}>
                <ListItemText title={item.name} secondary={item.phone_no}/>
                <ListItemSecondaryAction>
                  <IconButton>
                    <Icon color={"primary"}>chevron_right</Icon>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </div>
    );
  }

}

const AdvertiserDetail = ({ advertiser, onEdit }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={style.detailGrid}>
      <div style={style.detailTitle}>
        <Typography style={style.grow} variant={"h6"}>Title</Typography>
        <IconButton onClick={event => onEdit(advertiser)}>
          <Icon color={"primary"}>edit</Icon>
        </IconButton>
      </div>
      <div style={style.detailDescription}>
        <p>Name:<b> Kimi </b> </p>
        <p>Address:<b> Veng </b> </p>
        <p>Type:<b> Individual </b> </p>
      </div>
      <div style={style.detailDescription}>
        <p>Email:<b> Kimi@mail.com </b> </p>
        <p>Phone:<b> 989898999 </b> </p>
        <p>License status:<b> Permit </b> </p>
      </div>
      <Card style={style.detailList}>
        <CardHeader title={"List of Hoarding/Kiosk"} action={
          <Tooltip title={"Click here to add hoarding/kiosk"}>
            <Fab onClick={e=>setOpen(true)} color={"primary"} variant={"outlined"}>
              <Icon color={"inherit"}>add</Icon>
              Add advertisement
            </Fab>
          </Tooltip>
        }/>
        <Divider/>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText title={"#10000"} secondary={"Zuangtui local council"}/>
              <ListItemSecondaryAction>
                <>
                  <Chip label={"haording"} color={"primary"}/>

                  <Tooltip title={"Click here to remove hoarding/kiosk"}>
                    <IconButton>
                      <Icon color={"secondary"}>delete</Icon>
                    </IconButton>
                  </Tooltip>
                  </>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText title={"#33332"} secondary={"Chanmari local council"}/>
              <ListItemSecondaryAction>
                <>
                  <Chip label={"kiosk"} color={"secondary"}/>
                  <Tooltip title={"Click here to remove hoarding/kiosk"}>
                    <IconButton>
                      <Icon color={"secondary"}>delete</Icon>
                    </IconButton>
                  </Tooltip>
                </>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText title={"#12000"} secondary={"Chhinga veng local council"}/>
              <ListItemSecondaryAction>
                <>
                  <Chip label={"hoarding"} color={"primary"}/>
                  <Tooltip title={"Click here to remove hoarding/kiosk"}>
                    <IconButton>
                      <Icon color={"secondary"}>delete</Icon>
                    </IconButton>
                  </Tooltip>
                </>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <AdvertisementView open={open} onClose={() => setOpen(false)}
                         onAdvertisementSelect={(i, j) => console.log(i, j)}/>

    </div>
  );
};

class AdvertiserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAdvertiser: {}
    };
  }

  editAdvertiser = (advertiser) => console.log(advertiser);
  onItemClick = (selectedAdvertiser) => this.setState({ selectedAdvertiser });

  render() {
    const { open, selectedAdvertiser } = this.state;
    const { history, classes } = this.props;

    return (
      <div style={style.root}>
        <div className={classes.wrapper}>
          <Paper className={classes.component}>
            <CreateAdvertiser/>
          </Paper>
          <Paper className={classes.component}>
            <AdvertiserList onCreate={() => history.push(NEW_ADVERTISER)} onItemClick={this.onItemClick}/>
          </Paper>
          <Paper className={classes.component}>
            <AdvertiserDetail advertiser={selectedAdvertiser} onEdit={this.editAdvertiser}/>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(withRouter(AdvertiserContainer));