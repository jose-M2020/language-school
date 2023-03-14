import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { reservationStatus } from "../../helpers";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      
      return headers
    },
  }),
  reducerPath: "userApi",
  tagTypes: [
    "Users",
  ], 
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    })
  }),
});

export const {
  useGetUsersQuery,
} = usersApi;