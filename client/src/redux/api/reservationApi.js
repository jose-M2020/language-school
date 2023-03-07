import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { reservationStatus } from "../../helpers";

export const reservationsApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/api',
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
            color: reservationStatus(item.status).color,
            startStr: item.date,
          }
        ));
      }
    }),
    createReservation: builder.mutation({
      query: (data) => {
        const {userId, payload} = data;
        console.log(payload)
        return {
          url: `/users/${userId}/reservations`,
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: ["Reservations"],
    }),
    updateReservation: builder.mutation({
      query: (updatedReservation) => ({
        url: `/reservations/${updatedReservation.id}`,
        method: "PATCH",
        body: updatedReservation,
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