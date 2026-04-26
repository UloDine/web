"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./styles/styles.module.css";

function TabLayout({
  tabs,
  activeTab,
  onTabChange,
  //   tabContent,
}: {
  tabs: Array<{ label: string; value: string }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  //   tabContent: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentTab = params.get("tab") || activeTab;

  useEffect(() => {
    onTabChange(currentTab);
  }, [currentTab]);

  //   return (
  //     <section>
  //       <div>
  //         {tabs.map((tab) => (
  //           <Link href={`${pathname}?${currentTab}`}>{tab.label}</Link>
  //         ))}
  //       </div>
  //       {tabContent}
  //     </section>
  //   );
  return (
    <div className={styles.tab_layout}>
      {tabs.map((tab) => (
        <Link
          href={`${pathname}?tab=${tab.value}`}
          key={tab.value}
          style={
            {
              "--tab-color": currentTab === tab.value ? "#00bb95" : "#6b6a6a",
              "--tab-border":
                currentTab === tab.value ? "#00bb95" : "transparent",
            } as React.CSSProperties
          }
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default TabLayout;
