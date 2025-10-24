"use client";

import { useState } from "react";
import styles from "./CouponFilter.module.css";
import { Filter } from "@/app/coupons/page";

interface CouponFilterProps {
  onAddCoupon: () => void;
  onFilterChange: (filters: Filter) => void;
}

export default function CouponFilter({ onAddCoupon, onFilterChange }: CouponFilterProps) {
  const [filters, setFilters] = useState({
    code: "",
    isActive: "",
    startDate: "",
    endDate: "",
    maxDiscountValue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <input
          type="text"
          name="code"
          placeholder="Search by Code"
          value={filters.code}
          onChange={handleChange}
          className={styles.input}
        />

        <select
          name="isActive"
          value={filters.isActive}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="number"
          name="maxDiscountValue"
          placeholder="Max % Discount"
          value={filters.maxDiscountValue}
          onChange={handleChange}
          className={styles.input}
          min={0}
          max={100}
        />

        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>

        <button onClick={onAddCoupon} className={styles.addButton}>
          + Add Coupon
        </button>
      </div>
    </div>
  );
}
