const DEFAULT_FORMATS = [
  "qr_code",
  "code_128",
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
] as const;

export class QRCodeDetector {
  private detector: {
    detect: (
      source: BarcodeSource,
    ) => Promise<Array<{ format: string; rawValue: string }>>;
  };

  constructor(formats: string[] = [...DEFAULT_FORMATS]) {
    const Detector = QRCodeDetector.getDetectorCtor();
    if (!Detector) {
      throw new Error("BarcodeDetector is not supported in this environment.");
    }
    this.detector = new Detector({ formats });
  }

  static isSupported(): boolean {
    return Boolean(QRCodeDetector.getDetectorCtor());
  }

  static async getSupportedFormats(): Promise<string[]> {
    const Detector = QRCodeDetector.getDetectorCtor();
    if (!Detector || typeof Detector.getSupportedFormats !== "function") {
      return [];
    }

    return Detector.getSupportedFormats();
  }

  async detectFromSource(source: BarcodeSource): Promise<DecodedBarcode[]> {
    const detections = await this.detector.detect(source);
    return detections
      .filter((item) => Boolean(item.rawValue))
      .map((item) => ({
        format: item.format,
        rawValue: item.rawValue,
      }));
  }

  async detectFromBlob(blob: Blob): Promise<DecodedBarcode[]> {
    const bitmap = await createImageBitmap(blob);

    try {
      return await this.detectFromSource(bitmap);
    } finally {
      bitmap.close();
    }
  }

  async detectFromFile(file: File): Promise<DecodedBarcode[]> {
    return this.detectFromBlob(file);
  }

  async detectFirstValueFromBlob(blob: Blob): Promise<string | null> {
    const results = await this.detectFromBlob(blob);
    return results[0]?.rawValue ?? null;
  }

  private static getDetectorCtor(): {
    new (options?: { formats?: string[] }): {
      detect: (
        source: BarcodeSource,
      ) => Promise<Array<{ format: string; rawValue: string }>>;
    };
    getSupportedFormats?: () => Promise<string[]>;
  } | null {
    if (typeof window === "undefined") {
      return null;
    }

    const Detector = (globalThis as { BarcodeDetector?: unknown })
      .BarcodeDetector;
    if (!Detector) {
      return null;
    }

    return Detector as {
      new (options?: { formats?: string[] }): {
        detect: (
          source: BarcodeSource,
        ) => Promise<Array<{ format: string; rawValue: string }>>;
      };
      getSupportedFormats?: () => Promise<string[]>;
    };
  }
}
