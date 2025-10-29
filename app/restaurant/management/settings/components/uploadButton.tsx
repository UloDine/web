import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import { markUsed } from "@/utils/markUsed";
import styles from "../style/index.module.css";

function UploadFileButton({ className }: { className?: string }) {
  const [uploading, setUploading] = React.useState(false);
  // ensure the setter isn't flagged as unused in production
  markUsed(setUploading);
  return (
    <button
      disabled={uploading}
      className={`${styles.upload_button} ${className || ""}`}
      //   onClick={() => setUploading(true)}
    >
      {uploading ? (
        <span className={styles.spinner}></span>
      ) : (
        <span className={styles.icon}>{GeneralIcons.camera}</span>
      )}
    </button>
  );
}

export default UploadFileButton;
