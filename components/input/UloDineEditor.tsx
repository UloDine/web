import { GeneralIcons } from "@/icons/general/icons";
import React, { useState, useRef, useEffect } from "react";
import UloDineMDToJsx from "../md/UloDineToJsx";
import styles from "@/styles/components/input/Input.module.css";

function UloDineEditor({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (updatedValue: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [jsxContent, setJsxContent] = useState<React.ReactNode | null>(null);

  // Function to update formatted content
  useEffect(() => {
    setJsxContent(UloDineMDToJsx({ markdown: value }));
  }, [value]);

  // Save and restore cursor position
  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    return {
      range,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    };
  };

  const restoreSelection = (
    selectionInfo: {
      range?: Range;
      startOffset?: number;
      endOffset?: number;
    } | null
  ) => {
    if (!selectionInfo || !editorRef.current) return;

    const selection = window.getSelection();
    const range = document.createRange();

    // Use a TreeWalker to find the first text node inside the editor
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );
    const textNode = walker.nextNode();

    if (!textNode) return;

    const start = Math.min(
      selectionInfo.startOffset ?? 0,
      textNode.textContent?.length ?? 0
    );
    const end = Math.min(
      selectionInfo.endOffset ?? 0,
      textNode.textContent?.length ?? 0
    );

    range.setStart(textNode, start);
    range.setEnd(textNode, end);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const selectionInfo = saveSelection();
    onChange(e.currentTarget.textContent || "");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => restoreSelection(selectionInfo));
    });
  };

  // Apply or remove markdown formatting
  const applyFormatting = (
    formatter: (text: string) => string,
    remover: (text: string) => string
  ) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const startOffset = value.indexOf(selectedText);
    if (startOffset === -1) return;

    const isFormatted = value.includes(formatter(selectedText));
    const newValue = isFormatted
      ? value.replace(formatter(selectedText), remover(selectedText))
      : value.replace(selectedText, formatter(selectedText));

    onChange(newValue);
  };

  // Toolbar actions
  const actions = [
    {
      icon: GeneralIcons.bold,
      action: () =>
        applyFormatting(
          (text) => `**${text}**`,
          (text) => text.replace(/^\*\*(.*?)\*\*$/, "$1")
        ),
    },
    {
      icon: GeneralIcons.list,
      action: () =>
        applyFormatting(
          (text) =>
            text
              .split("\n")
              .map((line) => `- ${line}`)
              .join("\n"),
          (text) =>
            text
              .split("\n")
              .map((line) => line.replace(/^- /, ""))
              .join("\n")
        ),
    },
    {
      icon: GeneralIcons.link,
      action: () => {
        const url = prompt("Enter URL:");
        if (url) {
          applyFormatting(
            (text) => `[${text}](${url})`,
            (text) => text
          );
        }
      },
    },
  ];

  return (
    <div className={styles.editor}>
      <div className={styles.editor_header}>
        {actions.map(({ action, icon }, i) => (
          <button key={i} onClick={action}>
            {icon}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className={styles.editor_input}
        data-placeholder={placeholder ?? "Start writing..."}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      >
        {jsxContent}
      </div>
    </div>
  );
}

export default UloDineEditor;
