import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";

class ShoppingLicenseForm extends Component {


  render() {
    return (
      <div>
        <Card>
          <CardHeader title={"Shopping License Form"} subheader={"Star marks are mandatory"}/>
          <CardContent>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel
                htmlFor="outlined-age-simple"
              >
                Age
              </InputLabel>
              <Select
                value={20}

                input={
                  <OutlinedInput
                    labelWidth={40}
                    name="age"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField required={true} placeholder={"eg: private/group/firm"} variant={"outlined"}
                       label={"Type of applicant"} fullWidth={true} margin={"dense"}/>
            <TextField variant={"outlined"} label={"Name"} fullWidth={true} margin={"dense"}/>
            <TextField variant={"outlined"} label={"Name"} fullWidth={true} margin={"dense"}/>
          </CardContent>
          <CardActions>
            <Button variant={"outlined"} color={"primary"}>Submit</Button>
            <Button variant={"outlined"} color={"secondary"}>clear</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ShoppingLicenseForm;