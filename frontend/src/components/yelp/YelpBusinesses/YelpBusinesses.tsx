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

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

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

  const handleFetch = useCallback(async () => {
    const data = await fetchData();
    const newData: Business[] = data?.businesses ?? [];

    setBusinesses((prevData) => [...prevData, ...newData]);
  }, [fetchData]);

  useEffect(() => {
    handleFetch();
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
      {businesses && <RestaurantsGrid restaurants={filteredBusinesses} />}
    </main>
  );
};
