import React, {Component} from 'react';
import axios from 'axios';
import SimpleTable from '../../components/Staff/List';

class StaffList extends Component {
    state = {
        staffs: []
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.setState({staffs: response.data})
            });
    }

    render() {
        const staffs = this.state.staffs.map(staff => {
            return <p key={staff.id}>{staff.name}</p>
        });

        return (
            <div>
                <SimpleTable staffs={this.state.staffs} />
            </div>
        )
    }
}

export default StaffList;