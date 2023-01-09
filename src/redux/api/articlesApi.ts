import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import * as Keychain from 'react-native-keychain';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
    prepareHeaders: async headers => {
      try {
        const accessToken = await Keychain.getGenericPassword();

        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken.username}`);
        }
      } catch (error) {
        console.log('Keychain could not be accessed', error);
      }
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    fetchArticles: builder.query({
      query: (page: number) => {
        return {
          url: `/articles?page=${page}`,
          method: 'get',
        };
      },
    }),
  }),
});

export const {useFetchArticlesQuery} = articlesApi;
