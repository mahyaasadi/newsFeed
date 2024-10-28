import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// types
import { ArticlesResponse } from "src/app/types/type";

const API_KEY = "08b6e506c3e943308631df5429f4b011";

export const newsFeedSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsapi.org/v2/`,
  }),
  tagTypes: ["articles"],
  reducerPath: "articles",
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticlesResponse, number>({
      query: (pageNumber) =>
        `everything?q=bitcoin&apiKey=${API_KEY}&page=${pageNumber}&pageSize=20`,
      providesTags: (result, error, pageNumber) => [
        { type: "articles", id: pageNumber },
      ],
    }),
    getAllTopHeadlines: builder.query<ArticlesResponse, void>({
      query: () => `top-headlines?country=us&apiKey=${API_KEY}`,
      providesTags: ["articles"],
    }),
  }),
});

export const middleware = newsFeedSlice.middleware;
export const { useGetAllArticlesQuery, useGetAllTopHeadlinesQuery } =
  newsFeedSlice;
