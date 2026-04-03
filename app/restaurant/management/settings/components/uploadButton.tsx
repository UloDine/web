import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import styles from "../style/index.module.css";

function UploadFileButton({ className }: { className?: string }) {
  const [uploading] = React.useState(false);
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
