import { GeneralIcons } from "@/icons/general/icons";
import React, { useState } from "react";

function UloDineCopyText({
  text,
  textToCopy,
  onCopied,
  onCopyError,
}: CopyText) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      const value = textToCopy;
      await navigator.clipboard.writeText(value);

      setCopied(true);
      onCopied?.();

      // revert after a second
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
      onCopyError?.(err);
    }
  }
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "0.3rem" }}>
      <p>{text}</p>
      <button onClick={copy} title="Copy text">
        {copied ? GeneralIcons.check_regular : GeneralIcons.copy}
      </button>
    </div>
  );
}

export default UloDineCopyText;
