import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "08b6e506c3e943308631df5429f4b011";

export const newsFeedSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsapi.org/v2/`,
  }),
  tagTypes: ["articles"],
  reducerPath: "articles",
  endpoints: (builder) => ({
    articlesGetAll: builder.query({
      query: () => `everything?q=bitcoin&apiKey=${API_KEY}`,
      providesTags: ["articles"],
    }),
  }),
});

export const middleware = newsFeedSlice.middleware;
export const { useArticlesGetAllQuery } = newsFeedSlice;
