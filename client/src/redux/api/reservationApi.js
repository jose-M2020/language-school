import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservationsApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().auth.token;
      headers.set('Authorization', token ? `Bearer ${token}` : '');
      return headers
    },
  }),
  reducerPath: "reservationApi",
  tagTypes: [
    "Reservations",
  ],
  
  credentials: 'include', 
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: (userId) => `/users/${userId}/reservations`,
      providesTags: ['Reservations'],
    }),
    createReservation: builder.mutation({
      query: (newReservation) => ({
        url: "/reservations",
        method: "POST",
        body: newReservation,
      }),
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