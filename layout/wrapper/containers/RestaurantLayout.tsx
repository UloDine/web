import React, { ReactNode } from "react";
import RestaurantSidebar from "../../../components/sidebar/RestaurantSidebar";
import styles from "./styles/index.module.css";
import Outlet from "./Outlet";
import Topbar from "@/components/topbar";

function RestaurantLayout({ children }: { children: ReactNode }) {
  
  return (
    <section className={styles.main_layout}>
      <Topbar />
      <div className={styles.layout_content}>
        <RestaurantSidebar />
        <Outlet>{children}</Outlet>
      </div>
    </section>
  );
}

export default RestaurantLayout;
