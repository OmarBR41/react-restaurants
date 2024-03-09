import { useWindowSize } from "@/hooks/useWindowSize";
import { WINDOW_BREAKPOINT_SM } from "@/lib/constants";
import { Business } from "@/types";
import { useMemo } from "react";
import { RestaurantCard } from "../RestaurantCard";
import "./RestaurantsGrid.css";

type RestaurantsGridProps = {
  restaurants: Business[];
  observerRef?: (node: Element | null) => void;
};

export const RestaurantsGrid = ({
  restaurants,
  observerRef,
}: RestaurantsGridProps) => {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width <= WINDOW_BREAKPOINT_SM, [width]);

  return (
    <section className="restaurants-grid">
      {restaurants.map((r, i) => {
        const shouldSetObserver =
          (isMobile && i === restaurants.length - 6) ||
          (!isMobile && i === restaurants.length - 3);
        return (
          <RestaurantCard
            restaurant={r}
            observerRef={shouldSetObserver ? observerRef : () => {}}
          />
        );
      })}
    </section>
  );
};
