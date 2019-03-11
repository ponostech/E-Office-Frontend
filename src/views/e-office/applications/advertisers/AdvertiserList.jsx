import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";
import ReactTable from 'react-table'
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer";
import { OfficeRoutes } from "../../../../config/routes-constant/OfficeRoutes";

class AdvertiserList extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[
        {id:12,name:"Kimi",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:13,name:"Kungi",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:14,name:"Rami",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:22,name:"Tei",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:16,name:"Hmingi",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:22,name:"Rina",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
        {id:18,name:"Kapa",address:'Veng hming leh adagn te',lc:"Chanmari",validity:'12/12/2019'},
      ]
    }
  }
  render() {
    const { history } = this.props;
    const columns=[
      {
        Header:'Licence No',
        accessor:'id',
      },
      {
        Header:'Address',
        accessor:'address',
      },
      {
        Header:'Local Council',
        accessor:'lc',
      },
      {
        Header:'Expired on',
        accessor:'validity',
      },
      {
        Header:'Action',
        accessor:'id',
        Cell:props=>{
          return(
            <IconButton onClick={(e)=>{
              history.push(OfficeRoutes.ADVERTISER_DETAIL)
            }}>
              <MoreIcon/>
            </IconButton>
          )
        }
      },
    ]
    return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader title={"List of advertisers"} action={
                <Tooltip title={"Filter"}>
                  <IconButton>
                    <FilterIcon/>
                  </IconButton>
                </Tooltip>
              }/>
              <CardContent>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField style={{marginBottom:20}} variant={"standard"} placeholder={"Search"} InputProps={
                    {
                      endAdornment:(
                        <InputAdornment position={"end"}>
                          <SearchIcon color={"action"}/>
                        </InputAdornment>
                      ),
                    }
                  }/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <ReactTable
                    columns={columns}
                    data={this.state.data}
                    showPagination={true}
                    showPaginationBottom={true}
                    showPageSizeOptions={true}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    defaultPageSize={10}/>
                </GridItem>
              </CardContent>
              <CardActions>

              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

export default AdvertiserList;