import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes.js';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const userData = localStorage.getItem('userId');
      const { token } = JSON.parse(userData);
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => routes.chatDataPath()
    })
  }),
});

export const { useGetChannelsQuery } = apiSlice;