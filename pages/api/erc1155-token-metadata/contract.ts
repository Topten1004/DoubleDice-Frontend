import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).send({
    name: "DDVFS",
    description: "The decentralized pooled betting and gaming metaverse. Play the games or open your own rooms.",
    image: "ipfs://QmerthzV83Aeqa1ocWT5W55LrEwHJqgKTwDRFZHGN5YW4v/ddlogo.png",
    external_link: "https://ddvfs.com",
    seller_fee_basis_points: 1000, // Indicates a 10% seller fee.
    fee_recipient: "0x109f9E0FBd6Ea550BD2971a35EBba5D230324627" // Where seller fees will be paid to.
  })
};
