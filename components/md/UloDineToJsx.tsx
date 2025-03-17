import React from "react";

function UloDineMDToJsx({ markdown }: { markdown: string }) {
  function parseMarkdown(md: string) {
    const lines = md.split("\n");

    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) return <h1 key={index}>{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={index}>{line.slice(4)}</h3>;

      // Bold and Italics
      if (/\*\*(.*?)\*\*/.test(line)) {
        return (
          <p key={index}>
            {line
              .split(/(\*\*.*?\*\*)/)
              .map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
          </p>
        );
      }
      if (/\*(.*?)\*/.test(line)) {
        return (
          <p key={index}>
            {line
              .split(/(\*.*?\*)/)
              .map((part, i) =>
                part.startsWith("*") && part.endsWith("*") ? (
                  <em key={i}>{part.slice(1, -1)}</em>
                ) : (
                  part
                )
              )}
          </p>
        );
      }

      // Inline Code
      if (/`(.*?)`/.test(line)) {
        return (
          <p key={index}>
            {line
              .split(/(`.*?`)/)
              .map((part, i) =>
                part.startsWith("`") && part.endsWith("`") ? (
                  <code key={i}>{part.slice(1, -1)}</code>
                ) : (
                  part
                )
              )}
          </p>
        );
      }

      // Links
      if (/\[(.*?)\]\((.*?)\)/.test(line)) {
        const parts = line.split(/(\[.*?\]\(.*?\))/);
        return (
          <p key={index}>
            {parts.map((part, i) => {
              const match = part.match(/\[(.*?)\]\((.*?)\)/);
              return match ? (
                <a key={i} href={match[2]}>
                  {match[1]}
                </a>
              ) : (
                part
              );
            })}
          </p>
        );
      }

      // Lists
      if (line.startsWith("- ")) {
        return <li key={index}>{line.slice(2)}</li>;
      }

      return <p key={index}>{line}</p>;
    });
  }

  return <div>{parseMarkdown(markdown)}</div>;
}

export default UloDineMDToJsx;
