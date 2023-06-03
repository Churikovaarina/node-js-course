import { Client } from 'pg';
import { QueriesToDb } from "./enums";
import { config } from "dotenv";

config({ path: `./.env` });

const main = async () => {
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_STRING,
    });

    await client.connect(async (err) => {
        if (err)
            throw Error(err.stack);
    });

    const { rows: mostViewedVideos} = await client.query(QueriesToDb.SELECT_MOST_VIEWED_VIDEOS);
    console.log(mostViewedVideos);

    /*
    const { rows: usersWithChannels } = await client.query(QueriesToDb.SELECT_USERS_WITH_CHANNELS);
    console.log(usersWithChannels);

    const { rows: topLikedVideos } = await client.query(QueriesToDb.SELECT_TOP_LIKED_VIDEOS);
    console.log(topLikedVideos);

    const { rows: videosFromSubscription } = await client.query(QueriesToDb.SELECT_VIDEOS_FROM_SUBSCRIPTIONS);
    console.log(videosFromSubscription);

    const { rows: channelVideos } = await client.query(QueriesToDb.SELECT_CHANNEL_WITH_ID);
    console.log(channelVideos);

    const { rows: subscriptionsForUser } = await client.query(QueriesToDb.SELECT_SUBSCRIPTIONS_FOR_USERS);
    console.log(subscriptionsForUser);

    */

    client.end((err) => {
        console.log('disconnected');
    });
};

main();