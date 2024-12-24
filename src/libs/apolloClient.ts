import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphiql?path=/graphql",
  cache: new InMemoryCache(), // 클라이언트 캐시 설정
});

export default client;
