import { DEFAULT_LIMIT } from "@/lib/constants";
import { SkeletonCard } from "../SkeletonCard";
import "./SkeletonGrid.css";

export const SkeletonGrid = () => {
  return (
    <section className="skeleton-grid">
      {[...new Array(DEFAULT_LIMIT)].map((_, i) => (
        <SkeletonCard key={`skeleton-card-${i}`} />
      ))}
    </section>
  );
};
