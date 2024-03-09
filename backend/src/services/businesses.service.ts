import fetch from "node-fetch";
import { YELP_API_KEY, YELP_API_URL } from "../lib/constants";
import { BusinessAPIResponse } from "../types";

export async function fetchBusinesses({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<BusinessAPIResponse | unknown> {
  const urlWithParams = new URL(`${YELP_API_URL}/businesses/search`);

  urlWithParams.searchParams.append("location", "San Jose, CA 95127");
  urlWithParams.searchParams.append("term", "restaurants");

  if (limit) {
    urlWithParams.searchParams.append("limit", String(limit));
  }

  if (offset) {
    urlWithParams.searchParams.append("offset", String(offset));
  }

  return fetch(urlWithParams, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${YELP_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}
