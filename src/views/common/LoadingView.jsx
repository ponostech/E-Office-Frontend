import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const loadingView = (props) => {
  return (
    <Grid container justify="center">
      <Grid item lg={12} align={props.align ? props.align : "center"}>
        <div style={{ margin: 20 }}>
          <CircularProgress variant={"indeterminate"}
                            color={props.color ? props.color : "primary"}/>
        </div>
        {/*<Skeleton count={38}/>*/}
      </Grid>
    </Grid>
  );
};

export default loadingView;