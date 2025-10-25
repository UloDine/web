import React, { useRef, useEffect } from "react";
import { useMarkdownConverter } from "@/hooks/useMarkdownConverter";
import styles from "@/styles/components/input/Input.module.css";
import { GeneralIcons } from "@/icons/general/icons";

export default function UloDineHybridEditor({
  markdown,
  onChange,
  placeholder,
}: {
  markdown: string;
  onChange: (updatedMarkdown: string) => void;
  placeholder?: string;
}) {
  const { mdToHtml, htmlToMd } = useMarkdownConverter();
  const editorRef = useRef<HTMLDivElement>(null);

  // Render Markdown as HTML inside the editor
  useEffect(() => {
    const renderHtml = async () => {
      if (!editorRef.current) return;
      const currentMd = htmlToMd(editorRef.current.innerHTML);
      if (markdown !== currentMd) {
        const html = await mdToHtml(markdown);
        editorRef.current.innerHTML = html;
      }
    };
    renderHtml();
  }, [markdown]);

  // When the user types, convert HTML → Markdown and send it up
  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const md = htmlToMd(html);
    onChange(md);
  };

  // Inline formatting
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  // Toolbar actions
  const actions = [
    {
      icon: GeneralIcons.bold,
      action: () => applyFormat("bold"),
    },
    {
      icon: GeneralIcons.list,
      action: () => applyFormat("insertUnorderedList"),
    },
    {
      icon: GeneralIcons.link,
      action: () => {
        const url = prompt("Enter URL");
        if (url) applyFormat("createLink", url);
      },
    },
    {
      icon: "I",
      action: () => applyFormat("italic"),
    },
  ];

  return (
    <div className={styles.editor}>
      <div className={styles.editor_header}>
        {actions.map((btn, i) => (
          <button onClick={btn.action}>{btn.icon}</button>
        ))}
      </div>

      <div
        ref={editorRef}
        className={styles.editor_input}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder || "Start typing..."}
      />
    </div>
  );
}
