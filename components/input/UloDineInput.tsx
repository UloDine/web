"use client";
import React, { useEffect, useRef, useState } from "react";
import { markUsed } from "@/utils/markUsed";
import styles from "@/styles/components/input/Input.module.css";
import {
  formatPhoneNumber,
  getCountryDetails,
  isStrongPassword,
  isValidEmail,
  countryPhoneLengths,
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
  onResend,
  otpChange,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars
Input) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otpComplete, setOtpComplete] = useState<boolean>(
    Object.values(otp).every((v) => v !== ""),
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<InputError>({
    icon: GeneralIcons.error_circle,
    message: errorMessage ?? "Value cannot be empty",
  });
  const [error, setError] = useState<boolean>(false);

  const [countryDetails, setCountryDetails] = useState<IPGeolocation | null>(
    null,
  );

  const [secret, setSecret] = useState<boolean>(true);
  // avoid production lint failures for props that are intentionally unused
  markUsed(sending);

  function validateInput(
    inputVal: string,
    inputType: string,
  ): { isValid: boolean; message: string } {
    const currentVal = inputVal || value;

    // Check if empty
    if (currentVal == "" || currentVal == " ") {
      return { isValid: false, message: "Value cannot be empty" };
    }

    // Validate based on type
    if (inputType === "email") {
      if (!isValidEmail(currentVal)) {
        return {
          isValid: false,
          message: "Please enter a valid email address",
        };
      }
    } else if (inputType === "password") {
      if (!isStrongPassword(currentVal)) {
        return {
          isValid: false,
          message:
            "Password must be at least 6 characters with uppercase, lowercase, number, and special character",
        };
      }
    } else if (inputType === "phone") {
      // Remove formatting to count digits
      const digitsOnly = currentVal.replace(/\D/g, "");
      const cc = countryDetails?.country_code2 || "NG";
      const expectedLength = countryPhoneLengths[cc] || 10;

      if (digitsOnly.length < expectedLength) {
        return {
          isValid: false,
          message: `Phone number must be at least ${expectedLength} digits`,
        };
      }
    }

    return { isValid: true, message: "" };
  }

  function handleBlur() {
    if (!strict) {
      setError(false);
      return;
    }

    const validation = validateInput(value || inputValue, type);
    setError(!validation.isValid);

    if (!validation.isValid) {
      setAlertMessage({
        ...alertMessage,
        message: validation.message,
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e);

    setInputValue(e.target.value);
    setError(false);
    // Clear error message when user starts typing
    setAlertMessage({
      icon: GeneralIcons.error_circle,
      message: errorMessage ?? "Value cannot be empty",
    });
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
      otpChange?.(newOtp.join(""));

      // Move focus to next input if value is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (otp.every((val) => val !== "") && e.key !== "Backspace")
        e.preventDefault();
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pastedData = e.clipboardData?.getData("text") || "";
      const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

      if (digits.length > 0) {
        const newOtp = [...otp];
        digits.forEach((digit, idx) => {
          if (idx < newOtp.length) {
            newOtp[idx] = digit;
          }
        });

        setOtp(newOtp);
        otpChange?.(newOtp.join(""));

        // Focus on the next empty field or last field
        const nextEmptyIndex = newOtp.findIndex((val) => val === "");
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      }
    };

    return (
      <div className={styles.otp}>
        <span className={styles.otp_label}>
          Enter the OTP sent your email ***@***.com
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
              onPaste={handlePaste}
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
            // disabled={otpComplete}
            className={otpComplete ? styles.disabled : ""}
            onClick={() => {
              onResend?.();
              setTimeLeft(5 * 60);
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
              unoptimized
            />
            <span>{countryDetails?.calling_code}</span>
            <input
              type={type}
              placeholder={placeholder}
              value={value ?? inputValue}
              className={`${styles.input} ${className} ${error || invalid ? styles.error : ""}`}
              onChange={(e) => {
                if (onChange) onChange(e);

                const maxLength = countryDetails?.country_code2
                  ? countryPhoneLengths[countryDetails.country_code2] || 15
                  : 10;

                setInputValue(
                  formatPhoneNumber(
                    e.target.value,
                    maxLength,
                    countryDetails?.country_code2,
                  ),
                );
                setError(false);
              }}
              onBlur={handleBlur}
            />
          </div>
        ) : type == "password" ? (
          <div
            className={`${styles.password_input} ${error || invalid ? styles.error : ""}`}
          >
            <input
              type={secret ? type : "text"}
              placeholder={placeholder}
              className={`${styles.input} ${className}`}
              value={value ?? inputValue}
              onChange={handleChange}
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
            className={`${styles.input} ${className} ${error || invalid ? styles.error : ""}`}
            value={value ?? inputValue}
            onChange={(e) => {
              if (onChange) onChange(e);

              setInputValue(e.target.value);
              setError(false);
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
