"use client";
import React, { useEffect, useState } from "react";
import styles from "./style/Style.module.css";

const messages = [
  "🍳 Cracking fresh data eggs...",
  "🥗 Tossing some API salads...",
  "🍕 Poking the server with extra cheese...",
  "☕ Brewing coffee with roasted bits...",
  "🍔 Flipping backend burgers...",
  "🍜 Stirring up some delicious requests...",
  "🍰 Plating your dashboard...",
  "🍟 Roasting responses to perfection...",
  "🍤 Sampling bytes before serving...",
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.logo}>
        <svg
          width="61"
          height="42"
          viewBox="0 0 61 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.uloLogo}
        >
          <path
            d="M11.5029 24.126C11.5029 26.3675 12.0137 28.0983 13.0361 29.3174C14.0979 30.5363 15.691 31.1455 17.8145 31.1455C19.9379 31.1455 21.531 30.5364 22.5928 29.3174C23.6939 28.059 24.2441 26.3282 24.2441 24.126V10.5811C24.2731 10.5836 24.3024 10.5859 24.332 10.5859H35.8057V24.126C35.8057 26.8193 35.4015 29.2374 34.5977 31.3818H37.6934C41.0751 31.3818 43.7294 30.4574 45.6562 28.6094C47.5832 26.7611 48.5469 24.1456 48.5469 20.7637C48.5469 17.3424 47.5832 14.7077 45.6562 12.8594C43.7294 10.9719 41.0752 10.0283 37.6934 10.0283H37.0264C37.0924 9.89485 37.1298 9.74487 37.1299 9.58594V0H38.5781C42.9431 1.46425e-05 46.7576 0.884747 50.0215 2.6543C53.3247 4.38456 55.8612 6.82285 57.6309 9.96875C59.4005 13.1148 60.2852 16.7132 60.2852 20.7637C60.2852 24.7747 59.3811 28.3531 57.5723 31.499C55.8027 34.6449 53.2661 37.1227 49.9629 38.9316C46.6989 40.7013 42.9039 41.5859 38.5781 41.5859H22.1201L22.124 41.5566C20.6777 41.8501 19.1626 41.999 17.5781 41.999C14.1963 41.999 11.1682 41.3311 8.49414 39.9941C5.85935 38.6178 3.77489 36.5921 2.24121 33.918C0.746909 31.2439 0 27.9798 0 24.126V0H11.5029V24.126ZM35.1299 0V8.58594H24.332C24.3024 8.58595 24.2731 8.58731 24.2441 8.58984V0H35.1299Z"
            fill="#00A886"
          />
        </svg>
        <h1 className={styles.brand}>UloDine</h1>
      </div>
      <p key={index} className={styles.loadingText}>
        {messages[index]}
      </p>
    </div>
  );
}
