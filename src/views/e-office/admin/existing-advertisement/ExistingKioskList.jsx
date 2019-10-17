import React, { useState } from "reactn";
import moment from "moment";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import LoadingView from "../../../common/LoadingView";
import CardContent from "@material-ui/core/CardContent";
import MUIDataTable from "mui-datatables";
import { KioskService } from "../../../../services/KioskService";

const ExistingKioskList = ({ onEdit,onError, onDelete }) => {
  const [kiosks, setKiosks] = useState([]);
  const [loading, setLoading] = useState(true);

  new KioskService().get("active",
    errorMsg => onError(errorMsg),
    data => setKiosks(data))
    .finally(() => setLoading(false));

  const tableOptions = {
    filterType: "checkbox",
    responsive: "scroll",
    rowsPerPage: 8
  };

  const tableColumns = [
    {

      name: "applicant",
      label: "APPLICANT"
    },
    {
      name: "applicant",
      label: "CONTACT",
      options: {
        customBodyRender: value => value.phone_no
      }
    },
    {
      name: "created_at",
      label: "APPLICATION DATE",
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
          const { rowIndex } = tableMeta;
          let data = kiosks[rowIndex];
          const lat = Number(data.hoarding.latitude);
          const lng = Number(data.hoarding.longitude);
          return (
            <>
              <Tooltip title="View File">
                <IconButton color="primary" size="medium"
                            aria-label="View File" onClick={event => onEdit(data)}>
                  <Icon fontSize="small">folder</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Hoarding">
                <IconButton color="primary" size="medium"
                            aria-label="Delete" onClick={event => onDelete(data)}>
                  <Icon color={"secondary"} fontSize="small">delete</Icon>
                </IconButton>
              </Tooltip>

            </>
          );
        }
      }
    }
  ];
  return(
    <>
      {loading ? <LoadingView/> : <CardContent>
        <MUIDataTable
          title={"Hoarding: List of Existing Hoarding"}
          data={kiosks}
          columns={tableColumns}
          options={tableOptions}
        />
      </CardContent>}
    </>
  );
};

export default ExistingKioskList;