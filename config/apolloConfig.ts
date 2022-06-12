import { ApolloClient, InMemoryCache } from "@apollo/client";
import networkConfig from "./networkConfig";


const client = new ApolloClient({
  uri: networkConfig.subgraphEndpoint,
  cache: new InMemoryCache()
});

export default client 