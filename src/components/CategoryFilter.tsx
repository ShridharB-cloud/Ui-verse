import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: { value: string; label: string }[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          onClick={() => onSelect(category.value)}
          className={`category-chip relative ${
            activeCategory === category.value ? "category-chip-active" : ""
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          layout
        >
          <span className="relative z-10">{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
