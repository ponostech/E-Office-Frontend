import React, { Component } from "reactn";
import { Grid } from "@material-ui/core";
import InfoView from "./widgets/InfoView";
import PieChartView from "./widgets/PieChartView";
import LineChartView from "./widgets/LineChartView";
import DonutChartView from "./widgets/DonutChartView";


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
const pieData = {
  labels: [
    "Red",
    "Green",
    "Yellow"
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ],
    hoverBackgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ]
  }]
};

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
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
      <Grid spacing={3} container={true}>
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


        <Grid item={true} xs={12} sm={12} md={4}>
          <PieChartView data={pieData}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <PieChartView data={pieData}/>
        </Grid>
        <Grid item={true} xs={12} sm={12} md={4}>
          <DonutChartView data={pieData}/>
        </Grid>

        <Grid item={true} xs={12} sm={12} md={12}>
          <LineChartView data={lineData}/>
        </Grid>

      </Grid>
    );
  }
}

export default (AdvertiserDashboard);