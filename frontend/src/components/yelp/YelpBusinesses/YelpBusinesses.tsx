import {
  BACKEND_API_URL,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from "@/lib/constants";
import { Business } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { RestaurantsGrid } from "../RestaurantsGrid";
import "./YelpBusinesses.css";

export const YelpBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const url = new URL(`${BACKEND_API_URL}/businesses`);
      url.searchParams.append("limit", String(limit));
      url.searchParams.append("offset", String(offset));

      const res = await fetch(url);
      const data = await res.json();
      setOffset((prevOffset) => prevOffset + limit);

      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setBusinesses(data?.businesses ?? []);
    })();
  }, []);

  return (
    <main className="yelp-businesses">
      {isLoading && <p>Loading</p>}
      {!isLoading && !businesses && <p>No businesses found</p>}
      {businesses && <RestaurantsGrid restaurants={businesses} />}
    </main>
  );
};
