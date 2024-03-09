import "./BusinessRating.css";
import { RatingStar } from "./RatingStar";

type BusinessRatingProps = {
  id: string;
  rating: number;
};

export const BusinessRating = ({ id, rating }: BusinessRatingProps) => {
  const fullStars = Math.floor(rating);
  const partialStarPercentage =
    Number((rating - fullStars).toFixed(2)) * 100 + "%";

  return (
    <div className="ratings" title={String(rating)}>
      {[...Array(5)].map((_, i) => {
        const isStarFilled = i + 1 <= fullStars;
        const isStarEmpty = i > fullStars + 1;
        const percentage = isStarEmpty
          ? "0%"
          : isStarFilled
          ? "100%"
          : partialStarPercentage;
        const starId = `${id}-star-${i}`;

        return (
          <RatingStar key={starId} id={starId} percentageFilled={percentage} />
        );
      })}
    </div>
  );
};
