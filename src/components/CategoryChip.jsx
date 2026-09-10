import categories from "../data/categories.json";

export function getCategory(categoryId) {
  return categories.find((c) => c.id === categoryId);
}

export default function CategoryChip({ categoryId }) {
  const category = getCategory(categoryId);
  if (!category) return <span className="category-chip">{categoryId}</span>;

  return (
    <span className="category-chip">
      <span
        className="category-dot"
        style={{ background: category.color }}
        aria-hidden="true"
      />
      {category.name}
    </span>
  );
}
