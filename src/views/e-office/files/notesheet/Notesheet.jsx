import React, {Component} from "react";
import {EventNote} from "@material-ui/icons";

import Timeline from "../../../../components/Timeline/Timeline.jsx";
import image from "../../../../assets/img/faces/card-profile1-square.jpg";
import CreateNoteButton from "./CreateNoteButton";
import CreateNoteDialog from "../CreateNoteDialog";

const widgetStories = [
    {
        // First story
        inverted: true,
        badgeColor: "success",
        badgeIcon: EventNote,
        title: "Written By: Lala, Town Planner",
        titleColor: "info",
        body: (
            <>
                <p>
                    Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
                </p>
                <p>
                    Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
                </p>
            </>
        ),
        footerTitle: (
            <div>
                File Moved to : John Doe, Asst Town Planner on 3rd February, 2019 (Tuesday)
            </div>
        ),
        footerName: "Alec Thompson",
        footerDesignation: "Town Planner",
        avatar: image
    },
    {
        // Second story
        inverted: true,
        badgeColor: "success",
        badgeIcon: EventNote,
        title: "Another One",
        titleColor: "info",
        body: (
            <p>
                Thank God for the support of my wife and real friends. I also wanted to
                point out that it’s the first album to go number 1 off of streaming!!! I
                love you Ellen and also my number one design rule of anything I do from
                shoes to music to homes is that Kim has to like it....
            </p>
        ),
        footerTitle: (
            <div>
                File Moved to : John Doe, Asst Town Planner on 3rd February, 2019 (Tuesday)
            </div>
        ),
        footerName: "Alec Thompson",
        footerDesignation: "Town Planner",
        avatar: image
    },
    {
        // Third story
        inverted: true,
        badgeColor: "success",
        badgeIcon: EventNote,
        title: "Another Title",
        titleColor: "info",
        body: (
            <div>
                <p>
                    Called I Miss the Old Kanye That’s all it was Kanye And I love you
                    like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
                    LA 11:10PM
                </p>
                <p>
                    What if Kanye made a song about Kanye Royère doesn't make a Polar bear
                    bed but the Polar bear couch is my favorite piece of furniture we own
                    It wasn’t any Kanyes Set on his goals Kanye
                </p>
            </div>
        ),
        footerTitle: (
            <div>
                File Moved to : John Doe, Asst Town Planner on 3rd February, 2019 (Tuesday)
            </div>
        ),
        footerName: "Alec Thompson",
        footerDesignation: "Town Planner",
        avatar: image
    },
    {
        // Third story
        inverted: true,
        badgeColor: "success",
        badgeIcon: EventNote,
        title: "Another Title",
        titleColor: "info",
        body: (
            <div>
                <p>
                    Called I Miss the Old Kanye That’s all it was Kanye And I love you
                    like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
                    LA 11:10PM
                </p>
                <p>
                    What if Kanye made a song about Kanye Royère doesn't make a Polar bear
                    bed but the Polar bear couch is my favorite piece of furniture we own
                    It wasn’t any Kanyes Set on his goals Kanye
                </p>
            </div>
        ),
        footerTitle: (
            <div>
                File Moved to : John Doe, Asst Town Planner on 3rd February, 2019 (Tuesday)
            </div>
        ),
        footerName: "Alec Thompson",
        footerDesignation: "Town Planner",
        avatar: image
    }
];

class Notesheets extends Component {
    state = {
        openDialog: false
    };

    handleOpenCreateNote = () => {
        this.setState({openDialog: true});
    };

    handleCloseCreateNote = () => {
        this.setState({openDialog: false});
    };

    render() {
        return (
                <>
                    <CreateNoteButton click={this.handleOpenCreateNote} />
                    <Timeline simple stories={widgetStories} />
                    <CreateNoteButton click={this.handleOpenCreateNote} />

                    <CreateNoteDialog open={this.state.openDialog} close={this.handleCloseCreateNote}/>
                </>
        )
    };
};

export default Notesheets;