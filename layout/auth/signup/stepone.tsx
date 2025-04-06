"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useContext, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import { useSignUpContext } from "@/context/SignupContext";

function StepOne() {
  const { personal, setPersonal } = useSignUpContext();

  return (
    <div className={styles.step_one}>
      <div className={styles.input}>
        <UloDineInput
          value={personal.firstName}
          onChange={(e) => {
            setPersonal({ ...personal, firstName: e.target.value });
          }}
          type='text'
          label='First name'
          placeholder='e.g John'
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={personal.lastName}
          onChange={(e) => {
            setPersonal({ ...personal, lastName: e.target.value });
          }}
          type='text'
          label='Last name'
          placeholder='e.g Doe'
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={personal.email}
          onChange={(e) => {
            setPersonal({ ...personal, email: e.target.value });
          }}
          type='email'
          label='Email'
          placeholder='e.g johndoe@example.com'
          strict
        />
      </div>
      <div className={styles.input}>
        <UloDineInput
          value={personal.phone}
          onChange={(e) => {
            setPersonal({ ...personal, phone: e.target.value });
          }}
          type='phone'
          label='Phone'
          placeholder='e.g 123456789'
          strict
        />
      </div>
    </div>
  );
}

export default StepOne;
