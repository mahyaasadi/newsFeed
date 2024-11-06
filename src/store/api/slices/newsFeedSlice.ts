import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// types
import { ArticlesResponse } from "src/app/types/type";
// constants
import { API_KEY } from "src/app/constants/apikey";

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
    searchOnArticles: builder.mutation<
      ArticlesResponse,
      {
        title?: string;
        sortBy?: string;
        dateFrom?: string;
        dateTo?: string;
      }
    >({
      query: ({ title, sortBy, dateFrom, dateTo }) => {
        const params = new URLSearchParams();
        if (title) params.append("q", title);
        if (sortBy) params.append("sortBy", sortBy);
        if (dateFrom) params.append("from", dateFrom);
        if (dateTo) params.append("to", dateTo);
        params.append("apiKey", API_KEY);

        const url = `everything?${params.toString()}`;

        return {
          url,
          method: "GET",
        };
      },
    }),
  }),
});

export const middleware = newsFeedSlice.middleware;
export const {
  useGetAllArticlesQuery,
  useGetAllTopHeadlinesQuery,
  useSearchOnArticlesMutation,
} = newsFeedSlice;
