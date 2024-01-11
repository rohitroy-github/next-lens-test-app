import {Client, cacheExchange, fetchExchange} from "urql";

const APIURL = "https://api-v2.lens.dev/";

export const urqlClient = new Client({
  url: APIURL,
  exchanges: [cacheExchange, fetchExchange],
});

export const recommendProfiles = `query ProfileRecommendations($request: ProfileRecommendationsRequest!) {
  profileRecommendations(request: $request) {
    items {
      id
      handle {
        namespace
        localName
      }
      metadata {
        displayName
        bio
        coverPicture {
          raw {
            uri
          }
        }
      }
    }
  }
}`;

export const getProfileByID = `query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    id
    metadata {
      displayName
      bio
      picture {
        ... on ImageSet {
          raw {
            uri
          }
        }
      }
    }
    handle {
      fullHandle
      localName
    }
    stats {
      followers
      following
      posts
    }
  }
}`;
