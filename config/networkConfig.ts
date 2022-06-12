const networkConfig = {
  networkId: Number(process.env.NETWORK_ID!),
  subgraphEndpoint: process.env.GRAPHQL_QUERIES_URL!,
  platformContractAddress: process.env.PLATFORM_CONTRACT_ADDRESS!,
}

export default networkConfig; 