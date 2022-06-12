import { NextApiRequest, NextApiResponse } from "next";
import { request, gql } from 'graphql-request';
import moment from 'moment';
import { metadataImage } from 'utils/vfMetadataImage';
import networkConfig from "config/networkConfig";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Ex. If the URl is http://localhost:3000/api/erc1155-token-metadata/00000000000000000000000000000000000000755a98ef31e5075a00622f6284.json
  // req.query.id is "00000000000000000000000000000000000000755a98ef31e5075a00622f6284"
  // ERC1155 Token ID is "0x755a98ef31e5075a00622f6284"

  const { id } = req.query;
  if (Array.isArray(id)) {
    return res.status(400).send({
      status: "failed",
      message: "Invalid ID.",
    });
  }  

  const paddedHexString = id.replace(".json", "");

  if (!validateHexDecimal(paddedHexString)) {
    return res.status(400).send({
      status: "failed",
      message: "Invalid ID.",
    });
  }
  const hexString = paddedHexString.replace(/^0+/, '');

  const query = getQuery(`0x${hexString}`);
  const queryResult = await request(`${networkConfig.subgraphEndpoint}`, query);

  if (!queryResult.outcomeTimeslot) {
    return res.status(400).send({
      status: "failed",
      message: "Asset not found.",
    });
  }


  const result = queryResult.outcomeTimeslot;
  const vfId = result.outcome.virtualFloor.intId;  
  const timeslot = formatTimestamp(result.timeslot);

  return res.status(200).send({
    name: result.outcome.title,
    external_link: `${process.env.NEXT_PUBLIC_IMAGE_URL}/bet/${vfId}`,
    type: "object",
    description: `Description for VirtualFloor id: ${vfId}; Outcome: ${result.outcome.title}; Timeslot ${timeslot}; Number of tokens owned: ${result.outcome.virtualFloor.totalSupply}`,
    image: metadataImage(result.outcome.virtualFloor.title,
      formatTimestamp(result.outcome.virtualFloor.tClose),
      formatTimestamp(result.outcome.virtualFloor.tResolve),
      result.outcome.title,
      result.beta
      ),
    decimals: result.outcome.virtualFloor.paymentToken.decimals,
    attributes: [
      {
        display_type: "date",
        trait_type: "Start Time",
        value: result.outcome.virtualFloor.tOpen,
      },
      {
        display_type: "date",
        trait_type: "Close Time",
        value: result.outcome.virtualFloor.tClose,
      },
      {
        display_type: "date",
        trait_type: "Resolve Time",
        value: result.outcome.virtualFloor.tResolve,
      }
    ]
  })
};

const formatTimestamp = (timestamp: string) => moment(parseInt(timestamp) * 1000).format('MMMM Do YYYY, h:mm:ss a');

const validateHexDecimal = (hexString: string): boolean => {
  return hexString.length == 64 && /^[0-9a-f]+$/.test(hexString);
};

const getQuery = (erc1155TokenId: string): string => {
  const query = gql`
    {
      outcomeTimeslot(id: "${erc1155TokenId}") {
        id
        timeslot
    		beta
        outcome{
          id
          index
          title
          outcomeTimeslots{
            id
            timeslot
          }
          virtualFloor{
            id
            intId
            description
            title
            totalSupply
            bonusAmount
            tOpen
            tClose
            tResolve
            state
            paymentToken{
              decimals
            }
            opponents{
              id
              image
              title
            }
          }
        }
      }
    }
  `;
  return query;
};
