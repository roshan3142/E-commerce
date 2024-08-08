import React from "react";

function CategoryList({ categories, onSelectCategory }) {
  return (
    <div className="category-list">
      <h2>Categories</h2>
      {categories.map((category) => (
        <button
          className="btn"
          key={category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
export default CategoryList;
