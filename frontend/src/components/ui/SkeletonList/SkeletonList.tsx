import "./SkeletonList.css";

export const SkeletonList = () => {
  return (
    <section className="skeleton-list">
      {[...new Array(3)].map((_, i) => (
        <div
          key={`skeleton-card-${i}`}
          className="skeleton-line skeleton-line--pill"
        />
      ))}
    </section>
  );
};
