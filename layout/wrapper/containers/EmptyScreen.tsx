import React from "react";
import styles from "./styles/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import UloDIneButton from "@/components/button/UloDIneButton";

function EmptyScreen({
  subTitle,
  action,
  showButton,
  buttonLabel,
  icon,
  title,
  buttonColor,
}: EmptyScreen) {
  return (
    <div className={styles.empty_screen}>
      {icon ? icon : GeneralIcons.emptyScreen}
      <h2>{title ?? "There's Nothing to Show Here!"}</h2>
      <p className={styles.sub}>
        {subTitle ??
          "No record could be found at the moment. But don't worry, here will be populated as you create new records."}
      </p>
      {showButton && (
        <UloDIneButton
          color={buttonColor ?? "green"}
          label={buttonLabel as string}
          onClick={() => action?.()}
          type="primary"
        />
      )}
    </div>
  );
}

export default EmptyScreen;

// "use client";

// import React from "react";
// import styles from "./EmptyScreen.module.scss";

// type EmptyScreenProps = {
//   icon?: React.ReactNode;
//   title?: string;
//   subtitle?: string;
//   actionLabel?: string;
//   onAction?: () => void;
//   // optional: small variant for compact places
//   size?: "normal" | "compact";
// };

// const DefaultIcon = () => (
//   <svg
//     width="88"
//     height="88"
//     viewBox="0 0 88 88"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     aria-hidden="true"
//   >
//     <rect x="4" y="4" width="80" height="80" rx="16" fill="#F0FBF8" />
//     <path
//       d="M22 34c0-7.18 5.82-13 13-13h18c7.18 0 13 5.82 13 13v18c0 7.18-5.82 13-13 13H35c-7.18 0-13-5.82-13-13V34z"
//       fill="#E6FFF6"
//     />
//     <path
//       d="M33 36h22M33 44h22M33 52h12"
//       stroke="#00A886"
//       strokeWidth="3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export default function EmptyScreen({
//   icon,
//   title = "Nothing here yet",
//   subtitle = "Try adding something or adjust your filters.",
//   actionLabel,
//   onAction,
//   size = "normal",
// }: EmptyScreenProps) {
//   const compact = size === "compact";

//   return (
//     <section
//       className={`${styles.container} ${compact ? styles.compact : ""}`}
//       role="region"
//       aria-label={title}
//     >
//       <div className={styles.artboard}>
//         <div className={styles.iconWrapper} aria-hidden={!icon}>
//           {icon ?? <DefaultIcon />}
//         </div>

//         <h2 className={styles.title}>{title}</h2>
//         {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

//         {actionLabel && onAction && (
//           <button
//             className={styles.actionBtn}
//             onClick={onAction}
//             type="button"
//             aria-label={actionLabel}
//           >
//             {actionLabel}
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }
