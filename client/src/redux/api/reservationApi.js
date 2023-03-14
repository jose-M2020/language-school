import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { reservationStatus } from "../../helpers";

export const reservationsApi = createApi({
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
  reducerPath: "reservationApi",
  tagTypes: [
    "Reservations",
  ], 
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: (userId) => `/users/${userId}/reservations`,
      providesTags: ['Reservations'],
      transformResponse: (response) => {
        return response?.map(item => (
          {
            ...item,
            id: item._id,
            startStr: item.date,
          }
        ));
      }
    }),
    createReservation: builder.mutation({
      query: (data) => {
        const {userId, payload} = data;
        
        return {
          url: `/users/${userId}/reservations`,
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: ["Reservations"],
    }),
    updateReservation: builder.mutation({
      query: ({data, payload}) => ({
        url: `/users/${data.userId}/reservations/${data.reservationId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Reservations"],
    }),
    deleteReservation: builder.mutation({
      query: (reservationId) => ({
        url: `/tasks/${reservationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationsApi;