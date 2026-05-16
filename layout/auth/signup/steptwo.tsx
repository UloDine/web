"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useEffect, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import UloDineSelect from "@/components/input/UloDineSelect";
import nigerianStates from "@/res/states";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";

function StepTwo() {
  const { business, setBusiness } = useAuth();
  const [countries, setCountries] = useState<item[]>([]);
  const { data: cuisines, loading: cuisinesLoading } = useFetch<
    { name: string; key: string }[]
  >(apiRoutes.cuisine.fetchAll, []);

  const { data: categories, loading: categoriesLoading } = useFetch<
    { name: string; key: string }[]
  >(apiRoutes.categories.fetchAll, []);

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2",
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Array<{
          name?: { common?: string };
          cca2?: string;
        }>;

        if (!isMounted) return;

        const nextCountries = data
          .map((country) => {
            const label = country.name?.common?.trim();
            const value = country.cca2?.trim().toLowerCase();

            if (!label || !value) {
              return null;
            }

            return { label, value };
          })
          .filter((country): country is item => Boolean(country))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(nextCountries);
      } catch {
        if (isMounted) {
          setCountries([]);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.step_one}>
      <div className={styles.input}>
        <UloDineInput
          value={business.businessName}
          onChange={(e) => {
            setBusiness({ ...business, businessName: e.target.value });
          }}
          type="text"
          label="Business name"
          placeholder="e.g yummy buka"
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={business.tagline as string}
          onChange={(e) => {
            setBusiness({ ...business, tagline: e.target.value });
          }}
          type="text"
          label="Tagline"
          placeholder="e.g Best jollof in town"
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={business.businessAddress}
          onChange={(e) => {
            setBusiness({ ...business, businessAddress: e.target.value });
          }}
          type="text"
          label="Business address"
          placeholder="e.g abc road, 123 ave."
          strict
        />
      </div>
      {!categoriesLoading && (
        <div className={styles.input}>
          <UloDineSelect
            items={categories.map((category) => ({
              label: category.name,
              value: category.key,
            }))}
            onChange={(item) => {
              setBusiness({ ...business, category: item.label });
            }}
            label="Category"
            placeholder="Select category"
            searchable
          />
        </div>
      )}
      <div className={styles.input}>
        <UloDineSelect
          items={countries}
          onChange={(item) => {
            setBusiness({ ...business, country: item.label });
          }}
          label="Country"
          placeholder="Select country"
          searchable
        />
      </div>
      <div className={styles.input}>
        <UloDineSelect
          items={nigerianStates}
          onChange={(item) => {
            setBusiness({ ...business, state: item.label });
          }}
          label="State"
          placeholder="Select state"
          searchable
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={business.postalCode}
          onChange={(e) => {
            setBusiness({ ...business, postalCode: e.target.value });
          }}
          type="text"
          label="Postal code"
          placeholder="e.g 001234"
          strict
        />
      </div>
      {!cuisinesLoading && (
        <div className={styles.input}>
          <UloDineSelect
            items={cuisines.map((cuisine) => ({
              label: cuisine.name,
              value: cuisine.key,
            }))}
            onChange={(item) => {
              setBusiness({ ...business, cuisine: item.value });
            }}
            label="Cuisine"
            placeholder="Select cuisine"
          />
        </div>
      )}
      <div className={styles.input}>
        <UloDineInput
          value={business.description as string}
          onChange={(e) => {
            setBusiness({ ...business, description: e.target.value });
          }}
          type="textarea"
          label="Description"
          placeholder="Write a brief description about your restaurant"
          strict
        />
      </div>
    </div>
  );
}

export default StepTwo;
