import TabLayout from "@/app/customer/(wrapper)/orders/TabLayout";
import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import styles from "../../style/index.module.css";
import Filter from "@/components/filter/Filter";
import { capitalizeWord, formatCurrency } from "@/utils/helpers";
import { FilterIcon } from "@/icons/customer";
import UloDIneButton from "@/components/button/UloDIneButton";

function PaymentAndBilling() {
  const [activeTab, setActiveTab] = React.useState("accepting-orders");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [secondFilterOpen, setSecondFilterOpen] = React.useState(false);
  const tabs = [
    {
      label: "For accepting orders",
      value: "accepting-orders",
    },
    {
      label: "For plan subscription",
      value: "plan-subscription",
    },
  ];

  const orderTransactions = [
    {
      id: "txn_001",
      amount: 12500,
      date: "May 6, 2026",
      status: "completed",
      description: "Order payout #10012002344",
    },
    {
      id: "txn_002",
      amount: 8400,
      date: "May 5, 2026",
      status: "pending",
      description: "Order payout #10012002339",
    },
    {
      id: "txn_003",
      amount: 16750,
      date: "May 4, 2026",
      status: "completed",
      description: "Order payout #10012002331",
    },
    {
      id: "txn_004",
      amount: 6200,
      date: "May 2, 2026",
      status: "failed",
      description: "Card payment declined for plan renewal",
    },
    {
      id: "txn_005",
      amount: 9100,
      date: "Apr 30, 2026",
      status: "completed",
      description: "Order payout #10012002298",
    },
    {
      id: "txn_006",
      amount: 9900,
      date: "Apr 28, 2026",
      status: "completed",
      description: "Order payout #10012002284",
    },
  ];

  const plan = [
    {
      label: "Plan",
      value: "Free",
    },
    {
      label: "Orders/month",
      value: 10,
    },
    {
      label: "Total Menu Items",
      value: 5,
    },
    {
      label: "Support",
      value: "Basic email support",
    },
  ];

  return (
    <section className={styles.payment_and_billing}>
      <div className={styles.header}>
        <h1>Payment & Billing</h1>
        <p>Link or update bank/payment accounts</p>
      </div>
      <div className={styles.tab_layout}>
        <TabLayout
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      {activeTab === "accepting-orders" ? (
        <div className={styles.content}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>United Bank for Africa</h3>
              <p>UloDine Business</p>
              <small>22**********67</small>
              <button>{GeneralIcons.ellipsis}</button>
            </div>
          </div>
          <div className={styles.transactions}>
            <div className={styles.header}>
              <h4 className={styles.title}>Transaction History</h4>
              <div className={styles.filter}>
                {filterOpen && (
                  <Filter
                    action={() => {}}
                    filters={[
                      {
                        title: "Status",
                        items: [
                          {
                            key: "pending",
                            value: "Pending",
                          },
                          {
                            key: "failed",
                            value: "Failed",
                          },
                          {
                            key: "completed",
                            value: "Completed",
                          },
                          {
                            key: "all",
                            value: "All",
                          },
                        ],
                      },
                    ]}
                    onClose={() => setFilterOpen(false)}
                  />
                )}
                <button onClick={() => setFilterOpen((prev) => !prev)}>
                  <FilterIcon />
                </button>
              </div>
            </div>
            <ul className={styles.list}>
              {orderTransactions.map((trxn) => (
                <li key={trxn.id}>
                  <div>
                    <p>{trxn.description}</p>
                    <b>{formatCurrency(trxn.amount)}</b>
                  </div>
                  <div>
                    <p className={styles[trxn.status]}>
                      {capitalizeWord(trxn.status)}
                    </p>
                    <small>{trxn.date}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.plan}>
            <h3>My Plan</h3>
            <div className={styles.plan_card}>
              {plan.map((item, i) => (
                <div key={i} className={styles.plan_item}>
                  <p>{item.label}</p>
                  <b>{item.value}</b>
                </div>
              ))}
              <UloDIneButton
                label="Upgrade Plan"
                onClick={() => {}}
                type="primary"
                color="green"
                style={{ height: "3rem" }}
              />
            </div>
          </div>
          <div className={styles.transactions}>
            <div className={styles.header}>
              <h4 className={styles.title}>Transaction History</h4>
              <div className={styles.filter}>
                {secondFilterOpen && (
                  <Filter
                    action={() => {}}
                    filters={[
                      {
                        title: "Status",
                        items: [
                          {
                            key: "pending",
                            value: "Pending",
                          },
                          {
                            key: "failed",
                            value: "Failed",
                          },
                          {
                            key: "completed",
                            value: "Completed",
                          },
                          {
                            key: "all",
                            value: "All",
                          },
                        ],
                      },
                    ]}
                    onClose={() => setSecondFilterOpen(false)}
                  />
                )}
                <button onClick={() => setSecondFilterOpen((prev) => !prev)}>
                  <FilterIcon />
                </button>
              </div>
            </div>
            <ul className={styles.list}>
              {orderTransactions.map((trxn) => (
                <li key={trxn.id}>
                  <div>
                    <p>{trxn.description}</p>
                    <b>{formatCurrency(trxn.amount)}</b>
                  </div>
                  <div>
                    <p className={styles[trxn.status]}>
                      {capitalizeWord(trxn.status)}
                    </p>
                    <small>{trxn.date}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default PaymentAndBilling;
