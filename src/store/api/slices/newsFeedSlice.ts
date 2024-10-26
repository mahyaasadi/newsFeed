import { ArticlesResponse } from "@/app/types/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "08b6e506c3e943308631df5429f4b011";

export const newsFeedSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsapi.org/v2/`,
  }),
  tagTypes: ["articles"],
  reducerPath: "articles",
  endpoints: (builder) => ({
    articlesGetAll: builder.query<ArticlesResponse, void>({
      query: () => `everything?q=bitcoin&apiKey=${API_KEY}`,
      providesTags: ["articles"],
    }),
    topHeadlinesGetAll: builder.query<ArticlesResponse, void>({
      query: () => `top-headlines?country=us&apiKey=${API_KEY}`,
      providesTags: ["articles"],
    }),
  }),
});

export const middleware = newsFeedSlice.middleware;
export const { useArticlesGetAllQuery, useTopHeadlinesGetAllQuery } =
  newsFeedSlice;
