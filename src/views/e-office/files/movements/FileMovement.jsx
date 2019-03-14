import React, { Component } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

class FileMovement extends Component {
  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FROM</TableCell>
              <TableCell>TO</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>REMARKS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Kimi</TableCell>
              <TableCell>John doe</TableCell>
              <TableCell>12/12/2018</TableCell>
              <TableCell>Please forward</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kimi</TableCell>
              <TableCell>John doe</TableCell>
              <TableCell>12/12/2018</TableCell>
              <TableCell>Please forward</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kimi</TableCell>
              <TableCell>John doe</TableCell>
              <TableCell>12/12/2018</TableCell>
              <TableCell>Please forward</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default FileMovement;