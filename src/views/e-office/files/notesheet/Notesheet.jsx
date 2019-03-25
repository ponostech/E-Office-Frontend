import React from "react";
import {CardTravel, Extension, Fingerprint} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

import Timeline from "../../../../components/Timeline/Timeline.jsx";

const widgetStories = [
    {
        // First story
        inverted: true,
        badgeColor: "danger",
        badgeIcon: CardTravel,
        title: "Written By: Lala, Town Planner",
        titleColor: "danger",
        body: (
            <p>
                Wifey made the best Father's Day meal ever. So thankful so happy so
                blessed. Thank you for making my family We just had fun with the
                “future” theme !!! It was a fun night all together ... The always rude
                Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in
                downtown.
            </p>
        ),
        footerTitle: "11 hours ago via Twitter"
    },
    {
        // Second story
        inverted: true,
        badgeColor: "success",
        badgeIcon: Extension,
        title: "Another One",
        titleColor: "success",
        body: (
            <p>
                Thank God for the support of my wife and real friends. I also wanted to
                point out that it’s the first album to go number 1 off of streaming!!! I
                love you Ellen and also my number one design rule of anything I do from
                shoes to music to homes is that Kim has to like it....
            </p>
        )
    },
    {
        // Third story
        inverted: true,
        badgeColor: "info",
        badgeIcon: Fingerprint,
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
        footer: (
            <div>Custom Footer</div>
        )
    }
];

const notesheet = (props) => (
    <Grid item xs={12} sm={12} md={12}>
        <Timeline simple stories={widgetStories} />
    </Grid>
);

export default notesheet;