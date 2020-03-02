import React, { Component } from 'reactn';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import {
  Grid,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { ApiRoutes } from '../../../config/ApiRoutes';
import { FILE_DETAIL_ROUTE } from '../../../config/routes-constant/OfficeRoutes';
import LoadingView from '../../common/LoadingView';
import CardContent from '@material-ui/core/CardContent';

class DeskFiles extends Component {
  source = axios.CancelToken.source();

  state = {
    page: 0,
    limit: 5, // rowsPerPage
    count: 1,
    tableData: [['Loading Data...']],
    isLoading: false
  };

  componentDidMount() {
    this.setGlobal({ loading: true });
    this.getFiles();
  }

  componentWillUnmount() {
    this.source.cancel('Api is being canceled');
  }

  getFiles = () => {
    const { limit, page } = this.state;

    axios
      .get(ApiRoutes.DESK, {
        cancelToken: this.source.token,
        params: {
          page: page,
          limit: limit
        }
      })
      .then(res => this.processResult(res))
      .catch(err => {
        if (!axios.isCancel(err)) this.setGlobal({ errorMsg: err.toString() });
      })
      .then(() => this.setGlobal({ loading: false }));
  };

  processResult = res => {
    if (res.data.status)
      this.setState({
        tableData: res.data.data.files.data,
        count: res.data.data.files.total,
        isLoading: false
      });
    else this.setGlobal({ errorMsg: res.data.messages });
  };

  viewDetail = id => this.props.history.push(FILE_DETAIL_ROUTE(id));

  changePage = page => {
    this.setState({ page: page * 1 + 1, isLoading: true }, () => {
      this.getFiles();
    });
  };

  changeRowsPerPage = limit => {
    this.setState({ page: 1, isLoading: true, limit: limit }, () => {
      this.getFiles();
    });
  };

  sortPage = column => {
    console.log(column);
    // const sortDirection = column.sortDirection;
    // const sortColumn = column.name;
  };

  render() {
    const { count, page, limit, tableData, isLoading } = this.state;

    const tableOptions = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      serverSide: true,
      count: count,
      page: page,
      rowsPerPage: limit,
      rowsPerPageOptions: [5, 10, 20, 50],
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page);
            break;
          case 'changeRowsPerPage':
            this.changeRowsPerPage(tableState.rowsPerPage);
            break;
          case 'sort':
            this.sortPage(tableState.columns[tableState.activeColumn]);
            break;
          default:
            break;
        }
      }
    };

    const tableColumns = [
      {
        name: 'number',
        label: 'FILE NUMBER',
        options: {
          filter: false
        }
      },
      {
        name: 'subject',
        label: 'SUBJECT',
        options: {
          filter: false
        }
      },
      {
        name: 'updated_at',
        label: 'RECEIVED ON',
        options: {
          filter: false,
          customBodyRender: value => {
            return moment(value).format('Do MMMM YYYY');
          }
        }
      },
      {
        name: 'branch',
        label: 'BRANCH'
      },
      {
        name: 'id',
        label: 'ACTION',
        options: {
          filter: false,
          sort: false,
          customBodyRender: value => {
            return (
              <Tooltip title='View Details'>
                <IconButton
                  color='primary'
                  size='medium'
                  aria-label='View Details'
                  onClick={this.viewDetail.bind(this, value)}
                >
                  <Icon fontSize='small'>remove_red_eye</Icon>
                </IconButton>
              </Tooltip>
            );
          }
        }
      }
    ];

    const files = (
      <Grid item xs>
        <CardContent>
          <MUIDataTable
            title={
              <Typography variant='subtitle1'>
                Desk: List of File{' '}
                {isLoading && (
                  <CircularProgress
                    size={24}
                    style={{ marginLeft: 15, position: 'relative', top: 4 }}
                  />
                )}
              </Typography>
            }
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
        </CardContent>
      </Grid>
    );

    return <>{this.global.loading ? <LoadingView /> : files}</>;
  }
}

export default withRouter(DeskFiles);
