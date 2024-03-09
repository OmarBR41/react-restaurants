import { Category } from "@/types";
import { CategoryButton } from "../CategoryButton";
import "./CategoriesList.css";

type CategoriesListProps = {
  categories: Category[];
  selectedCategory: Category | null;
  handleFilter: (category: Category) => void;
};

export const CategoriesList = ({
  categories,
  selectedCategory,
  handleFilter,
}: CategoriesListProps) => {
  return (
    <section className="categories-list">
      {categories.map((c) => (
        <CategoryButton
          key={c.alias}
          category={c}
          isSelected={c.alias === selectedCategory?.alias}
          onClick={() => handleFilter(c)}
        />
      ))}
    </section>
  );
};
