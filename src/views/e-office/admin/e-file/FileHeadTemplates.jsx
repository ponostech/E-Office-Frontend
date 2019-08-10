import React, { Component } from "reactn";
import { Card, CardContent, createMuiTheme, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GroupHeadList from "./group-head/GroupHeadList";
import MainHeadList from "./main-head/MainHeadList";
import SubHeadList from "./sub-head/SubHeadList";
import Paper from "@material-ui/core/Paper";


const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #black"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    padding: "3px",
    textTransform: "initial",
    minWidth: 60,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class FileHeadTemplates extends Component {
  state = {
    value: "group-head"
  };

  componentDidMount() {
    this.setGlobal({ loading: false });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "black"
        },
        paper: {
          boxShadow: "none"
        }
      }
    },
    palette: {
      primary: {
        main: "#26B99A",
        contrastText: "#fff"
      },
      secondary: {
        main: "#b93e46",
        contrastText: "#fff"
      }
    }
  });

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card>
        {/*<CardHeader style={{ padding: "5px 16px" }} title={"FUNCTIONAL FILE INDEX"}/>*/}
        <CardContent>
          <Paper>
            <Tabs component={"div"}
                  value={value}
                  onChange={this.handleChange}
            >

              <Tab href={"#"} value={"group-head"}
                   disableRipple
                   label={"Group Head"}/>
              <Tab href={"#"} disableRipple value={"main-head"}
                   label={"Main Head"}/>
              <Tab href={"#"} disableRipple value={"sub-head"}
                   label={"Sub Head"}/>

            </Tabs>
            <div>
              {value === "group-head" && <GroupHeadList theme={this.getMuiTheme()}/>}
              {value === "main-head" && <MainHeadList theme={this.getMuiTheme()}/>}
              {value === "sub-head" && <SubHeadList theme={this.getMuiTheme()}/>}
            </div>
          </Paper>
        </CardContent>

      </Card>
    );
  }
}

export default withStyles(styles)(FileHeadTemplates);
