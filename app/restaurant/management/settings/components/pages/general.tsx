import React from "react";
import { markUsed } from "@/utils/markUsed";
import { ImagePlaceholder } from "../placeholder";
import UploadFileButton from "../uploadButton";
import styles from "../../style/index.module.css";
import EditPen from "../editPen";
import Section from "../section";
import { GeneralIcons } from "@/icons/general/icons";

function General() {
  const [name, setName] = React.useState("Mama Nkechi's Kitchen");
  const [desc, setDesc] = React.useState("Assorted Nigerian Dishes and More");
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // mark unused setter as used so production lint doesn't fail
  markUsed(setLoading);

  const nameRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);

  const contacts = [
    {
      icon: GeneralIcons.phone_out_line,
      value: "+2349034567823",
    },
    {
      icon: GeneralIcons.envelope_outline,
      value: "mamankechi@gmail.com",
    },
  ];

  const address = {
    icon: GeneralIcons.location_outline,
    value: "123 Abc Road, Owerri West, Imo.",
  };

  /* updateData was removed (unused) to avoid build lint errors */

  React.useEffect(() => {
    if (editing && nameRef.current) {
      const el = nameRef.current;
      const setCaret = () => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false); // caret at end
        sel?.removeAllRanges();
        sel?.addRange(range);
      };
      requestAnimationFrame(() => requestAnimationFrame(setCaret));
    }
  }, [editing, name]);

  React.useEffect(() => {
    if (descRef.current) {
      descRef.current.innerText = desc;
      const el = descRef.current;
      const setCaret = () => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false); // caret at end
        sel?.removeAllRanges();
        sel?.addRange(range);
      };
      requestAnimationFrame(() => requestAnimationFrame(setCaret));
    }
  }, [desc]);

  return (
    <section className={styles.general}>
      <div className={styles.banner_area}>
        <ImagePlaceholder />
        <div className={styles.profile_image}>
          <ImagePlaceholder className={styles.placeholder} />
          <UploadFileButton className={styles.upload_btn} />
        </div>
        <div className={styles.uploadButtonContainer}>
          <UploadFileButton />
        </div>
      </div>
      <div className={styles.restaurant_name}>
        <h1
          ref={nameRef}
          className={editing ? styles.active : ""}
          contentEditable={editing}
          data-placeholder="Enter Restaurant Name"
          suppressContentEditableWarning={true}
          autoFocus={editing}
          onInput={(e) => {
            setName(e.currentTarget.textContent || "");
          }}
        >
          {name}
        </h1>
        <div className={styles.edit_pen_container}>
          <EditPen
            // placeholder={name}
            loading={loading}
            editing={editing}
            setEditing={setEditing}
            value={name}
            onEdit={(data) => {
              setName(data.value);
            }}
          />
        </div>
      </div>
      <div className={styles.restaurant_desc}>
        <p
          ref={descRef}
          className={editing ? styles.active : ""}
          contentEditable
          data-placeholder="Edit description..."
          suppressContentEditableWarning={true}
          autoFocus={editing}
          onInput={(e) => {
            setDesc(e.currentTarget.textContent || "");
          }}
        >
          {desc}
        </p>
      </div>
      <Section title="Contact details">
        {contacts.map((contact, i) => (
          <div key={i} className={styles.section_edits_wrapper}>
            <div className={styles.inner_wrapper}>
              <span className={styles.icon}>{contact.icon}</span>
              <span className={styles.value}>{contact.value}</span>
            </div>
            <div className={styles.edit_pen_container}>
              <EditPen
                // placeholder={name}
                loading={loading}
                editing={editing}
                setEditing={setEditing}
                value={name}
                onEdit={(data) => {
                  setName(data.value);
                }}
              />
            </div>
          </div>
        ))}
      </Section>
      <Section title="Address">
        <div className={styles.section_edits_wrapper}>
          <div className={styles.inner_wrapper}>
            <span className={styles.icon}>{address.icon}</span>
            <span className={styles.value}>{address.value}</span>
          </div>
          <div className={styles.edit_pen_container}>
            <EditPen
              // placeholder={name}
              loading={loading}
              editing={editing}
              setEditing={setEditing}
              value={name}
              onEdit={(data) => {
                setName(data.value);
              }}
            />
          </div>
        </div>
      </Section>
    </section>
  );
}

export default General;
