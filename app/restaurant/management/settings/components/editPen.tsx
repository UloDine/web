import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import styles from "../style/index.module.css";

type editData = {
  value: string;
  loading: boolean;
  // response can be of any shape; prefer unknown instead of `any`
  response: unknown;
};

function EditPen({
  // placeholder,
  editing,
  setEditing,
  value,
  onEdit,
  loading,
}: {
  // placeholder?: string;
  editing: boolean;
  value: string;
  setEditing: (editing: boolean) => void;
  onEdit?: (data: editData) => void;
  loading: boolean;
}) {
  return (
    <button
      disabled={loading || (value === "" && editing)}
      className={`${styles.edit_pen} ${
        editing && value !== ""
          ? styles.editing
          : loading
          ? styles.loading
          : value === ""
          ? styles.empty
          : ""
      }`}
      onClick={() => {
        setEditing(!editing);
        // setLoading(!editing);
        onEdit?.({
          value,
          loading,
          response: null, // Placeholder for any response data
        });
      }}
    >
      {editing ? (
        <span className={styles.edit_pen_icon}>
          {GeneralIcons.check_line_white}
        </span>
      ) : loading ? (
        <span className={styles.edit_pen_loader}></span>
      ) : (
        <span className={styles.edit_pen_icon}>
          {editing && value === ""
            ? GeneralIcons.check_line_white
            : GeneralIcons.edit_pen}
        </span>
      )}
    </button>
  );
}

export default EditPen;
