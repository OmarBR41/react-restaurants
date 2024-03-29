import { Business } from "@/types";
import { BusinessRating } from "../BusinessRating";
import "./RestaurantCard.css";

type RestaurantCardProps = {
  restaurant: Business;
  observerRef?: (node: Element | null) => void;
};

export const RestaurantCard = ({
  restaurant,
  observerRef,
}: RestaurantCardProps) => {
  const { name, url, image_url, rating, price } = restaurant;

  return (
    <article className="restaurant-card" ref={observerRef}>
      <a href={url} target="_blank" className="overlay-link" />
      <img className="restaurant-image" src={image_url} alt={name} />
      <div className="restaurant-details">
        <h1 className="restaurant-name">{name}</h1>

        <div className="restaurant-info-container">
          <BusinessRating id={restaurant.alias} rating={rating} />
          <span className="restaurant-price">{price ?? "$"}</span>
        </div>

        <a className="restaurant-button" href={url} target="_blank">
          View
        </a>
      </div>
    </article>
  );
};
