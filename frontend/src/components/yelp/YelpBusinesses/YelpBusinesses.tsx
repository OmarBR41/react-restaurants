import { LoadingDots } from "@/components/ui/LoadingDots";
import { useObserver } from "@/hooks/useObserver";
import {
  BACKEND_API_URL,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from "@/lib/constants";
import { Business, Category } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { CategoriesList } from "../CategoriesList";
import { RestaurantsGrid } from "../RestaurantsGrid";
import "./YelpBusinesses.css";

export const YelpBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [hasMore, setHasMore] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

  const { measureRef, isIntersecting, observer } = useObserver({
    threshold: 0.85,
  });

  useEffect(() => {
    const abortController = new AbortController();

    if (isIntersecting && hasMore) {
      fetchData(abortController.signal);
      observer?.disconnect();
    }
    return () => {
      abortController.abort();
    };
  }, [isIntersecting, hasMore]);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);

      try {
        const url = new URL(`${BACKEND_API_URL}/businesses`);
        url.searchParams.append("limit", String(limit));
        url.searchParams.append("offset", String(offset));

        const res = await fetch(url, { signal });
        const data = await res.json();
        const newData: Business[] = data?.businesses ?? [];

        setOffset((prevOffset) => prevOffset + limit);
        setBusinesses((prevData) => [...prevData, ...newData]);
        setHasMore(data?.total > businesses.length);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, offset]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const newBusinessesCategories: Category[] = [...categories];

    businesses.forEach((b) => {
      const newCategories = b.categories.filter(
        (c) => !newBusinessesCategories.some(({ alias }) => alias === c.alias)
      );
      newBusinessesCategories.push(...newCategories);
    });

    setCategories((prevData) => [
      ...new Set(prevData.concat(newBusinessesCategories)),
    ]);
  }, [businesses]);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredBusinesses(businesses);
      return;
    }
    const filtered = businesses.filter((b) =>
      b.categories.some((c) => c.alias === selectedCategory.alias)
    );
    console.log(filtered);
    setFilteredBusinesses(filtered);
  }, [businesses, selectedCategory]);

  const filterByCategory = (category: Category) => {
    if (!category || category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <main className="yelp-businesses">
      {isLoading && <p>Loading</p>}
      {!isLoading && !businesses && <p>No businesses found</p>}
      {categories && (
        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          handleFilter={filterByCategory}
        />
      )}
      {businesses && (
        <RestaurantsGrid
          restaurants={filteredBusinesses}
          observerRef={measureRef}
        />
      )}
      {isLoading && businesses.length > 0 && <LoadingDots />}
    </main>
  );
};
