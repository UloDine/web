"use client";

import ChevronLeft from "@/icons/customer/ChevronLeft";
import jsQR from "jsqr";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles/style.module.css";

type NativeDetector = {
  detect: (source: ImageBitmapSource) => Promise<DetectedBarcode[]>;
};

type NativeDetectorCtor = {
  new (options?: { formats?: string[] }): NativeDetector;
  getSupportedFormats?: () => Promise<string[]>;
};

type DetectedBarcode = {
  rawValue: string;
  format: string;
  boundingBox?: DOMRectReadOnly;
};

const SCAN_LOCK_TIMEOUT = 1500;
const FRAME_SCAN_INTERVAL = 140;
const DETECTOR_FORMATS = [
  "qr_code",
  "code_128",
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
];
const VALID_QR_ORIGINS = [
  "http://localhost:4000",
  "http://127.0.0.1:4000",
  "https://app.ulodine.com",
  "https://ulodine.com",
];

function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scanAreaRef = useRef<HTMLDivElement | null>(null);
  const detectorRef = useRef<NativeDetector | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const processingRef = useRef(false);
  const scanLockRef = useRef(false);
  const lastScanRef = useRef(0);

  const [error, setError] = useState<string>("");
  const [detectedValue, setDetectedValue] = useState<string>("");

  const stopCamera = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    const video = videoRef.current;
    if (video) {
      video.srcObject = null;
    }
  }, []);

  const matchesValidOrigin = useCallback((value: string): boolean => {
    return VALID_QR_ORIGINS.some((origin) => value.startsWith(origin));
  }, []);

  const extractRestaurantPath = useCallback((value: string): string | null => {
    const match = value.match(/\/restaurants\/[^/?#]+/);
    return match ? match[0] : null;
  }, []);

  const isInsideScanBox = useCallback((box: DOMRectReadOnly): boolean => {
    const video = videoRef.current;
    const scanArea = scanAreaRef.current;
    if (!video || !scanArea) {
      return true;
    }

    const videoRect = video.getBoundingClientRect();
    const scanRect = scanArea.getBoundingClientRect();
    if (!videoRect.width || !videoRect.height) {
      return false;
    }

    const scaleX = video.videoWidth / videoRect.width;
    const scaleY = video.videoHeight / videoRect.height;

    const scanAreaOnVideo = {
      x: Math.max(0, (scanRect.left - videoRect.left) * scaleX),
      y: Math.max(0, (scanRect.top - videoRect.top) * scaleY),
      width: Math.min(video.videoWidth, scanRect.width * scaleX),
      height: Math.min(video.videoHeight, scanRect.height * scaleY),
    };

    // Strict containment against the overlay div with the `scan_area` class.
    return (
      box.x > scanAreaOnVideo.x &&
      box.y > scanAreaOnVideo.y &&
      box.x + box.width < scanAreaOnVideo.x + scanAreaOnVideo.width &&
      box.y + box.height < scanAreaOnVideo.y + scanAreaOnVideo.height
    );
  }, []);

  const handleDetectionResult = useCallback((rawValue: string) => {
    if (scanLockRef.current) {
      return;
    }

    scanLockRef.current = true;
    setDetectedValue(rawValue);
    setError("");

    // Keep this as a placeholder until the final route/handler is confirmed.
    // router.push(`/customer/scan?value=${encodeURIComponent(rawValue)}`);

    window.setTimeout(() => {
      scanLockRef.current = false;
    }, SCAN_LOCK_TIMEOUT);
  }, []);

  const detectWithJsQr = useCallback(async (): Promise<DetectedBarcode[]> => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      return [];
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return [];
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const found = jsQR(image.data, image.width, image.height, {
      inversionAttempts: "attemptBoth",
    });

    if (!found) {
      return [];
    }

    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    } = found.location;
    const minX = Math.min(
      topLeftCorner.x,
      topRightCorner.x,
      bottomLeftCorner.x,
      bottomRightCorner.x,
    );
    const minY = Math.min(
      topLeftCorner.y,
      topRightCorner.y,
      bottomLeftCorner.y,
      bottomRightCorner.y,
    );
    const maxX = Math.max(
      topLeftCorner.x,
      topRightCorner.x,
      bottomLeftCorner.x,
      bottomRightCorner.x,
    );
    const maxY = Math.max(
      topLeftCorner.y,
      topRightCorner.y,
      bottomLeftCorner.y,
      bottomRightCorner.y,
    );

    return [
      {
        rawValue: found.data,
        format: "qr_code",
        boundingBox: new DOMRectReadOnly(
          minX,
          minY,
          Math.max(0, maxX - minX),
          Math.max(0, maxY - minY),
        ),
      },
    ];
  }, []);

  const startScanLoop = useCallback(() => {
    const run = async (time: number) => {
      frameRef.current = requestAnimationFrame(run);

      if (
        processingRef.current ||
        time - lastScanRef.current < FRAME_SCAN_INTERVAL
      ) {
        return;
      }

      const video = videoRef.current;
      if (!video || video.readyState < 2 || scanLockRef.current) {
        return;
      }

      processingRef.current = true;
      lastScanRef.current = time;

      try {
        let results: DetectedBarcode[] = [];

        if (detectorRef.current) {
          results = await detectorRef.current.detect(video);
        } else {
          results = await detectWithJsQr();
        }

        const match = results.find(
          (barcode) =>
            barcode.rawValue &&
            (!barcode.boundingBox || isInsideScanBox(barcode.boundingBox)),
        );

        if (match) {
          handleDetectionResult(match.rawValue);
        }
      } catch {
        setError("Unable to scan right now. Please try again.");
      } finally {
        processingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(run);
  }, [detectWithJsQr, handleDetectionResult, isInsideScanBox]);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not available on this browser.");
      return;
    }

    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      video.srcObject = stream;
      await video.play();

      const BarcodeDetectorCtor = (
        globalThis as { BarcodeDetector?: NativeDetectorCtor }
      ).BarcodeDetector;

      if (BarcodeDetectorCtor) {
        let formats = [...DETECTOR_FORMATS];
        if (BarcodeDetectorCtor.getSupportedFormats) {
          const supported = await BarcodeDetectorCtor.getSupportedFormats();
          formats = formats.filter((item) => supported.includes(item));
        }

        detectorRef.current = new BarcodeDetectorCtor({
          formats,
        });
      } else {
        detectorRef.current = null;
      }

      startScanLoop();
    } catch {
      setError("Unable to access camera. Please allow permission and retry.");
    }
  }, [startScanLoop]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (!detectedValue) {
      return;
    }

    if (!matchesValidOrigin(detectedValue)) {
      setError("Invalid QR code. Please scan a valid UloDine restaurant QR.");
      scanLockRef.current = false; // Reset lock to allow re-scanning
      return;
    }

    const path = extractRestaurantPath(detectedValue);
    if (!path) {
      setError("Unable to extract restaurant information from QR code.");
      scanLockRef.current = false; // Reset lock to allow re-scanning
      return;
    }

    stopCamera();
    router.push(path);
  }, [
    detectedValue,
    extractRestaurantPath,
    matchesValidOrigin,
    router,
    stopCamera,
  ]);

  return (
    <section className={styles.scan_page}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft color="#ffffff" />
        </button>
        <h2>Scan QR Code</h2>
        <div></div>
      </div>
      <div className={styles.body}>
        <div className={styles.scan_area} ref={scanAreaRef}></div>
      </div>
      <video ref={videoRef} autoPlay playsInline muted></video>
      <canvas ref={canvasRef}></canvas>

      {error ? (
        <span style={{ color: "red", marginBottom: "1rem" }}>{error}</span>
      ) : null}
    </section>
  );
}

export default ScanPage;
