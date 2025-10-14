"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/input/Input.module.css";
import {
  formatPhoneNumber,
  getCountryDetails,
  isStrongPassword,
  isValidEmail,
} from "@/utils/helpers";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";

function UloDineInput({
  onChange,
  onTextAreaChange,
  type = "text",
  className,
  id,
  label = "Title here",
  placeholder = "Enter placeholder here",
  strict = false,
  value,
  onComplete,
  sending = false,
  errorMessage,
  invalid = false,
  disabled = false,
  otpLoading = false,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars
Input) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otpComplete, setOtpComplete] = useState<boolean>(
    Object.values(otp).every((v) => v !== "")
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<InputError>({
    icon: GeneralIcons.error_circle,
    message: errorMessage ?? "Value cannot be empty",
  });
  const [error, setError] = useState<boolean>(
    isValidEmail(value) || isStrongPassword(value)
  );

  const [countryDetails, setCountryDetails] = useState<IPGeolocation | null>(
    null
  );

  const [secret, setSecret] = useState<boolean>(true);

  function handleBlur() {
    if ((strict && value == "") || (strict && value == " ")) {
      setError(true);
      setAlertMessage({
        ...alertMessage,
        message: "Value cannot be empty",
      });
    } else {
      setError(false);
    }
  }

  useEffect(() => {
    const getResult = async () => {
      const result = await getCountryDetails();
      setCountryDetails(result);
    };
    getResult();
  }, []);
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop countdown when it reaches 0

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timeLeft]);

  useEffect(() => {
    const isComplete = otp.every((digit) => digit !== "");
    setOtpComplete(isComplete);

    if (isComplete && onComplete) {
      onComplete(otp);
    }
  }, [otp]);

  if (type == "otp") {
    // Format time as mm:ss
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    const handleChange = (index: number, value: string) => {
      if (isNaN(Number(value))) return; // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input if value is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    return (
      <div className={styles.otp}>
        <span className={styles.otp_label}>
          Enter the OTP sent your email j***@***.com
        </span>
        <div className={styles.otp_inputs}>
          {otp.map((item, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el; // ✅ Ensure no return value
              }}
              type="number"
              min={0}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className={styles.otp_bottom}>
          {otpLoading ? (
            <p className={styles.otp_verifying}>Verifying...</p>
          ) : (
            <p>
              Expires in <span>{formatTime(timeLeft)}</span> s
            </p>
          )}

          <button
            disabled={otpComplete}
            className={otpComplete ? styles.disabled : ""}
            onClick={() => {
              if (otpComplete && onComplete) {
                onComplete(otp);
                setTimeLeft(5 * 60);
              }
            }}
          >
            Resend OTP
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.input_wrapper}>
        <label htmlFor={id as string}>{label}</label>
        {type == "textarea" ? (
          <textarea
            id={id as string}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
            value={value ?? inputValue}
            onChange={(e) => {
              if (onTextAreaChange) onTextAreaChange(e);

              setInputValue(e.target.value);
            }}
          ></textarea>
        ) : type == "phone" ? (
          <div className={styles.phone}>
            <Image
              src={countryDetails?.country_flag ?? "/small.png"}
              alt="Country flag"
              width={14}
              height={14}
              className={styles.flag}
              quality={100}
            />
            <span>{countryDetails?.calling_code}</span>
            <input
              type={type}
              placeholder={placeholder}
              value={value ?? inputValue}
              className={`${styles.input} ${className} ${
                (error && value == "") || (error && value == " ")
                  ? styles.error
                  : ""
              }`}
              onChange={(e) => {
                if (onChange) onChange(e);

                setInputValue(formatPhoneNumber(e.target.value, 10));
                setError(false);
              }}
              onBlur={handleBlur}
            />
          </div>
        ) : type == "password" ? (
          <div
            className={`${styles.password_input} ${
              type == "password" && error
                ? styles.error
                : (error && value == "") || (error && value == " ")
                ? styles.error
                : ""
            }`}
          >
            <input
              type={secret ? type : "text"}
              placeholder={placeholder}
              className={`${styles.input} ${className}`}
              onChange={(e) => {
                if (onChange) onChange(e);

                setInputValue(e.target.value);
                setError(false);
              }}
              onBlur={handleBlur}
            />
            <button onClick={() => setSecret(!secret)}>
              {secret ? GeneralIcons.eye_closed : GeneralIcons.eye}
            </button>
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${className} ${
              (type == "email" && error) || (type == "password" && error)
                ? styles.error
                : (error && value == "") || (error && value == " ")
                ? styles.error
                : ""
            }`}
            value={value ?? inputValue}
            onChange={(e) => {
              if (onChange) onChange(e);

              setInputValue(e.target.value);
              setError(false);

              if (type == "email") {
                setError(!isValidEmail(value));
                setAlertMessage({
                  ...alertMessage,
                  message: "Invalid email address",
                });
              }
            }}
            onBlur={handleBlur}
            disabled={disabled}
          />
        )}
        {error || invalid ? (
          <div className={styles.alert_error}>
            {GeneralIcons.error_circle} <small>{alertMessage.message}</small>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UloDineInput;
