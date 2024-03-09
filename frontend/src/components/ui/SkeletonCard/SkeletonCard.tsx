import "./SkeletonCard.css";

export const SkeletonCard = () => {
  return (
    <article className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-details">
        <span className="skeleton-line skeleton-line--large" />

        <div className="skeleton-info-container">
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line--small" />
        </div>

        <span className="skeleton-button" />
      </div>
    </article>
  );
};
