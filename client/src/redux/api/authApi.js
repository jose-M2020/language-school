import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_BASE_URL  
  }),
  reducerPath: "authApi",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
} = authApi;