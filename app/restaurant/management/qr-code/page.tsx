"use client";
import React from "react";
import styles from "./style/index.module.css";
import PageTitleBar from "@/components/title";
import Image from "next/image";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineCopyText from "@/components/button/UloDineCopyText";
import { GeneralIcons } from "@/icons/general/icons";
// import { useRouter } from "next/router";
import { useProfile } from "@/context/ProfileContext";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";
import InPageLoader from "@/components/loaders/InPageLoader";
import { resolveAssetUrl } from "@/utils/helpers";

function getSafeImageSrc(path?: string | null, fallback = "/placeholder.png") {
  const resolved = resolveAssetUrl(path);
  return resolved && resolved.trim() ? resolved : fallback;
}

function QrManagement() {
  // const router = useRouter();
  const { restaurant } = useProfile();
  const id = restaurant?.id || "";
  const { data, loading } = useFetch<QRResponse | null>(
    apiRoutes.restaurant.qr.fetchOverview(id),
    null,
  );

  if (loading || !data) {
    return <InPageLoader text="Fetching your QR data..." />;
  } else {
    async function downloadAsset(url: string, type: "pdf" | "png") {
      try {
        if (!url || !url.trim()) {
          throw new Error("Asset is not available yet.");
        }

        const base = resolveAssetUrl(url);
        if (!base || !base.trim()) {
          throw new Error("Asset is not available yet.");
        }

        const res = await fetch(base, { credentials: "include" });
        if (!res.ok) throw new Error(`Failed to download: ${res.status}`);

        const blob = await res.blob();
        const ext = type === "pdf" ? "pdf" : "png";

        // Create a filename from restaurant business name if available
        const nameBase = (data?.business_name || "ulo-dine-qr")
          .replace(/[^a-z0-9-_]/gi, "-")
          .toLowerCase();
        const filename = `${nameBase}.${ext}`;

        const href = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = href;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // release memory
        URL.revokeObjectURL(href);
      } catch (error: unknown) {
        // basic fallback alert — app has toast/alert contexts if you want richer UX
        if (error instanceof Error) alert(error.message);
        else alert(String(error) || "Failed to download asset");
      }
    }
    return (
      <section className={styles.qr_code}>
        <PageTitleBar title="QR Code" />
        <p>
          Let your customers easily access your menu and place orders by
          scanning this QR code.
        </p>
        <div className={styles.top}>
          <Image
            src={getSafeImageSrc(data.qr_code)}
            width={100}
            height={100}
            alt={data.business_name + " QR Code"}
            quality={100}
          />
          <div className={styles.right}>
            <div className={styles.inner_left}>
              <p>Restaurant name: {data.business_name}</p>
              {/* <p>ID: #0243</p> */}
              <UloDineCopyText
                text={`Url: ${data.restaurant_url}`}
                textToCopy={data.restaurant_url}
              />
            </div>
            <div className={styles.inner_right}>
              <small>Download as:</small>
              <div className={styles.buttons}>
                <UloDIneButton
                  color="green"
                  label="PDF"
                  onClick={() => downloadAsset(data.pdfPath, "pdf")}
                  type="secondary"
                />
                <UloDIneButton
                  color="green"
                  label="PNG"
                  onClick={() => downloadAsset(data.imgPath, "png")}
                  type="secondary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <Image
            src={getSafeImageSrc(data.imgPath)}
            width={100}
            height={100}
            alt={data.business_name + " poster"}
            quality={100}
          />
          <div className={styles.overlay}>
            <div className={styles.wrapper}>
              <p>
                <strong>Tip:</strong> Display this QR code in your restaurant to
                allow customers to scan and access your menu instantly.
              </p>
            </div>
            <UloDIneButton
              color="green"
              label="Download poster"
              onClick={() => downloadAsset(data.imgPath, "png")}
              type="primary"
              icon={GeneralIcons.download_white}
              style={{ padding: "2rem" }}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default QrManagement;
