import React, { Component } from "reactn";
import { Grid } from "@material-ui/core";
import InfoView from "./widgets/InfoView";
import ChartistGraph from "react-chartist";
import Card from "../../components/Card/Card";
import PieChartView from "./widgets/PieChartView";



var simpleLineChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  series: [
    [12, 9, 7, 8, -10],
    [2, 1, 3.5, 7, 3],
    [134, 37, 87, 5, 6],
    [14, 37, 4, 77, 6],
    [15, 37, 9, 5, 78],
    [14, 3, 67, 5, 6],
    [17, 3, 4, 56, 89]
  ]
};
var pieData={
  series:[50,50]
}
var options = {
  height: "400px",
  high: 100,
  low: -10,
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null;
    }
  }
};

class AdvertiserDashboard extends Component {

  componentDidMount() {
    let self = this;
    this.setGlobal({ loading: true });
    setTimeout(function(handler) {
      self.setGlobal({ loading: false });
    }, 4000);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid spacing={4} container={true}>
        {/*<p>Advertiser dashboard</p>*/}
        <Grid item={true} xs={12} sm={12} md={4}>
          <InfoView onLinkClick={e => console.log("rest")}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <InfoView onLinkClick={e => console.log("rest")}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <InfoView onLinkClick={e => console.log("rest")}/>
        </Grid>

        <Grid item={true} xs={12} sm={12} md={12}>
          <Card  raised={true}>
            <ChartistGraph data={simpleLineChartData} options={options} type={"Bar"}/>
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
            <PieChartView data={pieData}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <PieChartView data={pieData}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <PieChartView data={pieData}/>
        </Grid>

      </Grid>
    );
  }
}

export default (AdvertiserDashboard);