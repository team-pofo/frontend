import { useAuthStore } from "@/stores/authStore";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HttpLink 설정
const httpLink = new HttpLink({
  uri: "/api/graphql",
});

// Context Link 설정
const authLink = setContext((_, { headers }) => {
  // 주스탠드에서 엑세스 토큰 가져오기
  const accessToken = useAuthStore.getState().accessToken;
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// Apollo Client 생성
const client = new ApolloClient({
  link: authLink.concat(httpLink), // authLink와 httpLink 연결
  cache: new InMemoryCache(),
});

export default client;
