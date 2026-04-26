import Link from "next/link";
import React from "react";
import styles from "./styles/home.module.css";

function Categories() {
  const categories = [
    {
      name: "Rice Dishes",
      slug: "rice-dishes",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Fast Food",
      slug: "fast-food",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Soups",
      slug: "soups",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Local Delicacies",
      slug: "local-delicacies",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Grilled & BBQ",
      slug: "grilled-bbq",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Pastries & Snacks",
      slug: "pastries-snacks",
      media:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGRpc2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];
  return (
    <div className={styles.categories}>
      <h3>Browse by Category</h3>
      <div>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/customer/restaurants?category=${category.slug}`}
            style={
              { "--bg-image": `url(${category.media})` } as React.CSSProperties
            }
          >
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
