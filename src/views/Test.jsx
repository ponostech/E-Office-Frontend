

import React from 'react';
import ReactToPrint from 'react-to-print';
import AdvertiserViewDialog from "./e-office/applications/advertisers/common/AdvertiserViewDialog";
import AdvertisementView from "./e-office/admin/registered-advertiser/AdvertisementView";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
        <th>column 1</th>
        <th>column 2</th>
        <th>column 3</th>
        </thead>
        <tbody>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      open:false
    }
  }

  render() {
    const{open}=this.state
    return (
      <div>
        <AdvertisementView open={open} onClose={()=>this.setState({open:false})} onAdvertisementSelect={(l,j)=>console.log(l,j)}/>
       <button onClick={event => this.setState({open:true})}>click</button>
      </div>
    );
  }
}