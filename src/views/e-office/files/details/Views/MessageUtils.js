import moment from "moment";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import React from "reactn";

export const tableColumn = (list, view, reply) => {
  const columns = [
    {
      name: "to",
      label: "TO"
    },
    {
      name: "message",
      label: "Messages"
    },
    {
      name: "sent",
      label: "created_at",
      options: {
        customBodyRender: value => moment(value).format("Do MMMM YYYY")
      }
    },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Tooltip title="View Message">
                <IconButton size="medium" onClick={e => view()}>
                  <Icon fontSize="small">remove_red_eye</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Reply">
                <IconButton
                  color="primary"
                  size="medium"
                  aria-label="View Details"
                  onClick={event => reply()}
                >
                  <Icon fontSize="small">reply</Icon>
                </IconButton>
              </Tooltip>
            </>
          );
        }
      }
    }
  ];
  return columns;
};
