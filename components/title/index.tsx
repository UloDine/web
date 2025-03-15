import React from "react";
import style from "./style/index.module.css";

function PageTitleBar({ title, rightContent }: PageTitle) {
  return (
    <div className={style.title}>
      <h2>{title}</h2>
      {rightContent}
    </div>
  );
}

export default PageTitleBar;
