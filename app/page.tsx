import Image from "next/image";
import styles from "./page.module.css";
import HeaderNavLayout from "@/layout/pageNavbar";
import Hero from "@/layout/hero";
import Footer from "@/layout/footer";

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
