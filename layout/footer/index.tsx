import { footerObjects } from "@/res/footer";
import Link from "next/link";
import React from "react";
import styles from "./style/index.module.css";
import { SocialIcons } from "@/icons/socials/icons";
import { GeneralIcons } from "@/icons/general/icons";

function Footer() {
  const socials: SocialObject[] = [
    {
      icon: SocialIcons.x_black,
      link: "https://x.com/ulodine",
    },
    {
      icon: SocialIcons.facebook,
      link: "https://facebook.com/ulodine",
    },
    {
      icon: SocialIcons.instagram,
      link: "https://instagram.com/ulodine",
    },
    {
      icon: SocialIcons.linkedin,
      link: "https://linkedin.com/ulodine",
    },
  ];

  const appLinks: AppLinkObject[] = [
    {
      icon: GeneralIcons.goolge_play_store,
      link: "https://play.google.com/store/apps/details?id=com.ulodine.customer",
    },
    {
      icon: GeneralIcons.apple_app_store,
      link: "https://apps.apple.com/app/ulodine/id6444221234",
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {footerObjects.map((data, i) => (
          <div key={i} className={styles.top_card}>
            <strong>{data.title}</strong>
            <ul>
              {data.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_left}>
          <strong>Follow Us</strong>
          <ul className={styles.socials}>
            {socials.map((social, idx) => (
              <li key={idx}>
                <Link
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottom_center}>
          {appLinks.map((app, idx) => (
            <Link
              key={idx}
              href={app.link}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.app_link}
            >
              {app.icon}
            </Link>
          ))}
        </div>
        <p>Built with ❤️ to serve local restaurants better.</p>
      </div>
      <small>
        &copy; {new Date().getFullYear()} UloDine. All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;
