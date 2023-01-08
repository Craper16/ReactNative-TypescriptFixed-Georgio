import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {API_KEY} from '@env';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: API_KEY}),
  endpoints: builder => ({
    signInUser: builder.mutation({
      query: (body: {username: string; password: string}) => {
        return {
          url: '/auth/signin',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const {useSignInUserMutation} = authApi;
