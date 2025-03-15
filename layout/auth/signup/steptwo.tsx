"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useContext, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import { SignupContext } from "@/context/SignupContext";
import UloDineSelect from "@/components/input/UloDineSelect";
import nigerianStates from "@/res/states";

function StepTwo() {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("Context needs to be wrapped in a provider");
  }

  const { business, setBusiness } = context;

  return (
    <div className={styles.step_one}>
      <div className={styles.input}>
        <UloDineInput
          value={business.businessName}
          onChange={(e) => {
            setBusiness({ ...business, businessName: e.target.value });
          }}
          type='text'
          label='Business name'
          placeholder='e.g yummy buka'
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={business.businessAddress}
          onChange={(e) => {
            setBusiness({ ...business, businessAddress: e.target.value });
          }}
          type='text'
          label='Business address'
          placeholder='e.g abc road, 123 ave.'
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineSelect
          items={nigerianStates}
          onChange={(item) => {
            setBusiness({ ...business, state: item.label });
          }}
          label='State'
          placeholder='Select state'
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={business.postalCode}
          onChange={(e) => {
            setBusiness({ ...business, postalCode: e.target.value });
          }}
          type='text'
          label='Postal code'
          placeholder='e.g 001234'
          strict
        />
      </div>
    </div>
  );
}

export default StepTwo;
