"use client";

import { useState } from "react";
import styles from "./notificationFilter.module.css";
import { Filter } from "@/app/notifications/page";

interface CouponFilterProps {
  onFilterChange: (filters: Filter) => void;
}

export default function NotificationFilter({ onFilterChange }: CouponFilterProps) {
  const [filters, setFilters] = useState({ type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    onFilterChange(filters);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.row}>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">All Types</option>
          <option value="coupon">Coupon</option>
          <option value="info">Infomation</option>
          {/* <option value="shipping">Free Shipping</option> */}
        </select>

        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
}
