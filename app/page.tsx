//import Router from "next/router";
//import NProgress from "nprogress";
//import "global.css"; // Import the CSS you created

import Image from "next/image";
import styles from "./page.module.css";
import HeaderNavLayout from "@/layout/pageNavbar";
import Hero from "@/layout/hero";
import Footer from "@/layout/footer";

// Optional config
// Optional config
/*NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());*/

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <HeaderNavLayout />
        <Hero />
      </main>
      <Footer />
    </>
  );
}
