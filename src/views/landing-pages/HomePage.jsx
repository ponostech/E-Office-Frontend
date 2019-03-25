import React, {Component} from "react";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import Services from "./Services/Services";

class HomePage extends Component {
    handleLink = link => event => {
        const {history} = this.props;
        history.push(link);
    };

    render() {
        return (
            <GridContainer justify="center">
                <Services click={this.handleLink}/>
            </GridContainer>
        );
    }
}

export default HomePage;