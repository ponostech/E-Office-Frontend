import React, { Component } from "reactn";
import {
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
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
    width:"2px",
    height:"100%",
    marginLeft:10,
    marginRight:10,
    backgroundColor:"rgba(0, 0, 0, 0.12)"
  },
  component: {
    margin: 3,
    padding: 10,
    display:"flex"
  },
  topMargin: {
    marginTop: 30
  },
  row: {
    display: "flex",
    alignItems: "center"
  }, column: {
    display: "flex",
    flexGrow:1,
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  },
  detail: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "auto"
  },
  list: {
    padding: 10
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

  return (
    <div className={style.column}>
      <div style={style.row}>
        <Typography style={style.grow} variant={"h6"}>Title</Typography>
        <IconButton onClick={event => onEdit(advertiser)}>
          <Icon color={"primary"}>edit</Icon>
        </IconButton>
      </div>
      <div style={style.detail}>
        <p>dafdfddd</p>
        <p>dafdfddd</p>
        <p>dafdfddd</p>
        <p>dafdfddd</p>
      </div>
      <div className={style.list}>

      </div>
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
      <Paper style={style.root}>
        <div className={classes.wrapper}>
          <div className={classes.component}>
            <CreateAdvertiser/>
          </div>
          <div className={classes.component}>
            <div className={classes.verticalLine}/>
            <AdvertiserList onCreate={() => history.push(NEW_ADVERTISER)} onItemClick={this.onItemClick}/>
          </div>
          <div className={classes.component}>
            <div className={classes.verticalLine}/>
            <AdvertiserDetail advertiser={selectedAdvertiser} onEdit={this.editAdvertiser}/>
          </div>
        </div>

        <Grid container={true} spacing={3}>

          <Grid item={true} md={4}>
            <Paper style={style.component}>
              <AdvertiserList onCreate={() => history.push(NEW_ADVERTISER)} onItemClick={this.onItemClick}/>
            </Paper>
          </Grid>

          <Grid item={true} md={8}>
            <Paper style={style.component}>
              <AdvertiserDetail advertiser={selectedAdvertiser} onEdit={this.editAdvertiser}/>
            </Paper>
          </Grid>

        </Grid>
        <AdvertisementView open={open} onClose={() => this.setState({ open: false })}
                           onAdvertisementSelect={(i, j) => console.log(i, j)}/>
      </Paper>
    );
  }
}

export default withStyles(style)(withRouter(AdvertiserContainer));