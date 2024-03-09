import { Category } from "@/types";
import "./CategoryButton.css";

type CategoryButtonProps = {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
};

export const CategoryButton = ({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) => {
  const className = `category-button ${
    isSelected ? "category-button--selected" : ""
  }`;

  return (
    <button className={className} onClick={onClick}>
      {category.title}
    </button>
  );
};
