import { CreditCardIcon, EditIcon } from "@/icons/customer";
import React from "react";
import styles from "../style/index.module.css";
import UloDineModal from "@/components/modal/UloDineModal";
import { useBankAccount } from "@/context/BankAccountContext";
import { GeneralIcons } from "@/icons/general/icons";
import EmptyScreen from "@/layout/wrapper/containers/EmptyScreen";
import UloDineSelect from "@/components/input/UloDineSelect";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";
import UloDineInput from "@/components/input/UloDineInput";
import { useResolveAccount } from "@/hooks/useResolveAccount";
import { useProfile } from "@/context/ProfileContext";
import Spinner from "@/components/loaders/Spinner";

function CollectionAccount() {
  // const account = {
  //   bankName: "Access Bank",
  //   accountNumber: "1234567890",
  //   accountName: "UloDine Limited",
  // };
  const accountNumberRef = React.useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { restaurant } = useProfile();
  const [selectedBank, setSelectedBank] = React.useState<string>("");
  const { data: banks, loading: banksLoading } = useFetch<Bank[]>(
    apiRoutes.payments.banks.fetchNgerian,
    [],
    { enabled: true },
  );

  const bankOptions = banks.map((bank) => ({
    label: bank.name,
    value: bank.code,
  }));
  const { account, createAccount, updateAccount } = useBankAccount();
  const {
    resolve,
    loading: resolving,
    error: resolveError,
  } = useResolveAccount();

  const [createPayload, setCreatePayload] = React.useState<BankAccountPayload>({
    bankAccountNumber: "",
    bankCode: "",
    bankName: "",
    nameOnAccount: "",
    restaurantId: restaurant?.id || "",
    businessName: restaurant?.business_name || "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setCreatePayload((prev) => ({
      ...prev,
      restaurantId: restaurant?.id || "",
      businessName: restaurant?.business_name || "",
    }));
  }, [restaurant?.id, restaurant?.business_name]);

  const resolveTimer = React.useRef<NodeJS.Timeout | null>(null);
  React.useEffect(() => {
    const acct = createPayload.bankAccountNumber?.trim();
    if (resolveTimer.current) {
      clearTimeout(resolveTimer.current);
    }

    if (selectedBank && acct && acct.length === 10) {
      // debounce a short while
      resolveTimer.current = setTimeout(async () => {
        try {
          const res = await resolve(acct, selectedBank);
          if (res) {
            const name =
              res.account_name || res.accountName || res.accountname || "";
            setCreatePayload((p) => ({ ...p, nameOnAccount: name }));
          }
        } catch {
          // ignore, hook sets error
        }
      }, 300);
    }

    return () => {
      if (resolveTimer.current) clearTimeout(resolveTimer.current);
    };
  }, [selectedBank, createPayload.bankAccountNumber]);

  return (
    <section className={styles.collection_account}>
      <div className={styles.header}>
        <h3>Collection account</h3>
        {!account ? (
          <button style={{ color: "#959595" }}>
            {GeneralIcons.plus}
            <span>Add Account</span>
          </button>
        ) : (
          <button>
            <EditIcon color="#00BB95" />
            <span>EDIT</span>
          </button>
        )}
      </div>
      {!account ? (
        <div className={styles.emp}>
          <EmptyScreen
            title="No Collection Set"
            subTitle="Set up a collection account to receive payments for your orders."
            icon={<CreditCardIcon />}
            showButton
            action={() => {
              setModalOpen(true);
            }}
            buttonLabel="Create account"
          />
        </div>
      ) : (
        <div className={styles.card_content}>
          <h3>{account.accountName}</h3>
          <p>{account.bankName}</p>
          <small>{account.accountNumber}</small>
        </div>
      )}

      <UloDineModal
        title={account ? "Edit Account" : "Add Bank"}
        isOpen={modalOpen}
        onClose={() => setModalOpen((prev) => !prev)}
        initialFocusRef={
          accountNumberRef as unknown as React.RefObject<HTMLElement>
        }
        actionButtonText={account ? "Update account" : "Create account"}
        zIndex={999}
        size="md"
        showActions={
          createPayload.bankAccountNumber.length === 10 &&
          selectedBank &&
          !resolveError &&
          !resolving
            ? true
            : false
        }
        onAction={async () => {
          try {
            setSubmitting(true);
            const res = account
              ? await updateAccount(
                  restaurant?.id || createPayload.restaurantId,
                  createPayload,
                )
              : await createAccount(createPayload);
            // if success, close modal
            if (res) setModalOpen(false);
          } finally {
            setSubmitting(false);
          }
        }}
        actionButtonLoading={submitting}
      >
        <div className={styles.modal_content}>
          <div className={styles.select_wrapper}>
            <UloDineSelect
              label="Select Bank"
              placeholder={
                banksLoading ? "Loading banks..." : "choose your bank"
              }
              items={bankOptions}
              onChange={(selected) => {
                // `selected` is an object { label, value }
                setSelectedBank(selected.value);
                setCreatePayload((p) => ({
                  ...p,
                  bankCode: selected.value,
                  bankName: selected.label,
                }));
              }}
              searchable
            />
          </div>
          <div className={styles.select_wrapper}>
            <UloDineInput
              type="text"
              label="Bank account number"
              value={createPayload.bankAccountNumber}
              placeholder={"Enter your account number"}
              ref={accountNumberRef}
              onChange={(e) =>
                setCreatePayload((prev) => ({
                  ...prev,
                  // keep only digits to avoid non-numeric input and preserve cursor
                  bankAccountNumber: String(e.target.value).replace(/\D/g, ""),
                }))
              }
            />
          </div>
          {resolving ? (
            <div>
              <Spinner size={20} />
            </div>
          ) : createPayload.nameOnAccount ? (
            <div className={styles.account_name}>
              {createPayload.nameOnAccount}
            </div>
          ) : resolveError ? (
            <div
              className={`${styles.account_name} ${resolveError ? styles.error : ""}`}
            >
              {resolveError}
            </div>
          ) : null}
        </div>
      </UloDineModal>
    </section>
  );
}

export default CollectionAccount;
