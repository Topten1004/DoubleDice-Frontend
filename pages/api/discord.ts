// Next
import { NextApiRequest, NextApiResponse } from "next";

// Utils
import axios from "axios";
import Honeybadger from '@honeybadger-io/js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { DISCORD_BOT_TOKEN, DISCORD_API_URL, DISCORD_GUILD_ID } = process.env;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  };

  if (req.method === "POST") {
    const { channelName } = req.body;

    try {
      const result = await axios.post(
        `${DISCORD_API_URL}/guilds/${DISCORD_GUILD_ID}/channels`,
        {
          name: channelName,
          permission_overwrites: [],
          type: 0,
        },
        {
          headers,
        }
      );

      if (result && result.data)
        return res.status(200).send({
          status: "success",
          message: `Channel is created successfully.`,
          data: result.data,
        });
    } catch (error: any) {
      Honeybadger.notify(error)
      return res.status(500).send({
        status: "failed",
        message: `Error creating channel: ${error}`,
      });
    }
  }
};
