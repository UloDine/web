import React from "react";
import styles from "../style/index.module.css";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExportIcon,
  FilterIcon,
} from "@/icons/customer";
import { capitalizeWord, formatCurrency } from "@/utils/helpers";
import Filter from "@/components/filter/Filter";
import createExportPayload, { type ExportFormat } from "./export";
import SEED_TRANSACTIONS_FLAT from "./seedTransactions";

type TransactionFilter = {
  key: string;
  value: string;
};

function Transactions() {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [secondFilterOpen, setSecondFilterOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<
    TransactionFilter[]
  >([]);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const sections = [5, 10, 15, 20];

  // apply selected filters (currently supports status filters)
  const filteredList = SEED_TRANSACTIONS_FLAT.filter((trxn) => {
    if (!selectedFilters || selectedFilters.length === 0) return true;

    // treat 'all' as no-op
    return selectedFilters.every((f) => {
      if (!f || f.key === "all") return true;
      // status filters match transaction.status
      if (["pending", "completed", "failed"].includes(f.key)) {
        return trxn.status === f.key;
      }
      // fallback: allow
      return true;
    });
  });

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const currentTransactions = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const visiblePageStart = Math.min(
    safeCurrentPage,
    Math.max(1, totalPages - 2),
  );
  const visiblePages = Array.from(
    { length: 3 },
    (_, idx) => visiblePageStart + idx,
  ).filter((page) => page <= totalPages);

  function goToPrevPage() {
    if (safeCurrentPage > 1) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  }

  function goToNextPage() {
    if (safeCurrentPage < totalPages) {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  }

  function changeItemsPerPage(nextItemsPerPage: number) {
    setItemsPerPage(nextItemsPerPage);
    setCurrentPage(1);
    setSecondFilterOpen(false);
  }

  function handleExport(format: string) {
    const map: Record<string, string> = {
      CSV: "csv",
      Excel: "xlsx",
      JSON: "json",
      TSV: "tsv",
    };
    const fmt = (map[format] || format.toLowerCase()) as ExportFormat;
    const payload = createExportPayload(filteredList, fmt, `transactions`);

    const blob = new Blob([payload.data], {
      type: payload.mimeType + ";charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = payload.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.transactions}>
      <div className={styles.header}>
        <h4 className={styles.title}>Transaction History</h4>
        <div className={styles.filter}>
          {filterOpen && (
            <Filter
              action={(filters) => {
                // Apply filters and close
                setSelectedFilters(filters || []);
                setFilterOpen(false);
                setCurrentPage(1);
              }}
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
              selectedFilters={selectedFilters}
              updateSelectedFilters={(next) => setSelectedFilters(next)}
              onClose={() => setFilterOpen(false)}
            />
          )}
          <button onClick={() => setFilterOpen((prev) => !prev)}>
            <FilterIcon color="#171717" />
            <span>Filter</span>
          </button>
          <button onClick={() => setExportOpen((prev) => !prev)}>
            <ExportIcon />
            <span>Export</span>
            {exportOpen && (
              <div className={styles.export_drop}>
                {["CSV", "Excel", "JSON", "TSV"].map((format) => (
                  <span
                    key={format}
                    onClick={() => {
                      handleExport(format);
                      setExportOpen(false);
                    }}
                  >
                    {format}
                  </span>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {currentTransactions.map((trxn) => (
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
      <div className={styles.pagination}>
        <p>
          Page {safeCurrentPage} of {totalPages}
        </p>
        <div className={styles.center}>
          <button
            onClick={goToPrevPage}
            disabled={safeCurrentPage === 1}
            className={safeCurrentPage === 1 ? styles.chevron_disabled : ""}
          >
            <ChevronLeftIcon color="#171717" />
          </button>

          {visiblePages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === safeCurrentPage ? styles.active : ""}
            >
              {page}
            </span>
          ))}

          <button
            onClick={goToNextPage}
            disabled={safeCurrentPage === totalPages}
            className={
              safeCurrentPage === totalPages ? styles.chevron_disabled : ""
            }
          >
            <ChevronRightIcon color="#171717" />
          </button>
        </div>
        <div className={styles.right}>
          <button
            className={styles.drop_button}
            onClick={() => setSecondFilterOpen((prev) => !prev)}
          >
            <span>{itemsPerPage}/page</span>
            <ChevronDownIcon />
          </button>
          {secondFilterOpen && (
            <div className={styles.drop}>
              {sections.map((n) => (
                <button key={n} onClick={() => changeItemsPerPage(n)}>
                  {n}/page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
