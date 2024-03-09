import { Business } from "@/types";
import { RestaurantCard } from "../RestaurantCard";
import "./RestaurantsGrid.css";

type RestaurantsGridProps = {
  restaurants: Business[];
};

export const RestaurantsGrid = ({ restaurants }: RestaurantsGridProps) => {
  return (
    <section className="restaurants-grid">
      {restaurants.map((r) => (
        <RestaurantCard restaurant={r} />
      ))}
    </section>
  );
};
