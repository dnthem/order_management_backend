import { useData } from "../../customHooks/useData";
import { STORES } from "../../indexedDB/indexedDB";
import CustomerTable from "./CustomerTable/CustomerTable";
import UserInfoForm from "../Orders.V2/UserInfoForm";
import useToggle from "../../customHooks/useToggle";
import { useDeferredValue, useState } from "react";
import SelectInput from "./SelectInput";
import CustomerHeader from "./CustomerHeader/CustomerHeader";
import PageLink from "./PageLink";

function Customers(props) {
  const [customers, setCustomers] = useData({
    store: STORES.CUSTOMERS.name,
    index: STORES.CUSTOMERS.keyPath,
    keyPath: null,
  });

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [addFormToggle, setAddFormToggle] = useToggle(false);
  const [sortedBy, setSortedBy] = useState("registerationDate");
  const [page, setPage] = useState(1);
  const isStale = query !== deferredQuery;
  const numberToDisplay = 10;

  const handleSortBy = (sortBy) => {
    setSortedBy(sortBy);
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.customerName
      .toLowerCase()
      .includes(deferredQuery.toLowerCase());
  });

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (a[sortedBy] < b[sortedBy]) {
      return 1;
    }
    if (a[sortedBy] > b[sortedBy]) {
      return -1;
    }
    return 0;
  });

  const numberToDisplayCustomers = sortedCustomers.slice(
    (page - 1) * numberToDisplay,
    page * numberToDisplay
  );

  const handlePageChange = (page) => {
    setPage(page);
  };

  const deleteCustomer = async (id) => {
    await setCustomers({
      type: "delete",
      indexField: STORES.CUSTOMERS.keyPath,
      keyPath: id,
    });
  };

  const updateCustomer = (id, newVal) => {
    setCustomers({
      type: "update",
      indexField: STORES.CUSTOMERS.keyPath,
      newVal: { ...newVal, [STORES.CUSTOMERS.keyPath]: id },
    });
  };

  return (
    <>
      {addFormToggle && (
        <UserInfoForm
          setCustomers={setCustomers}
          customers={customers}
          onAddCustomerSubmit={() => setAddFormToggle(false)}
          showForm={setAddFormToggle}
        />
      )}
      <CustomerHeader
        query={query}
        setQuery={setQuery}
        setAddFormToggle={setAddFormToggle}
      />

      <div className="row">
        <SelectInput handleSortBy={handleSortBy} />
      </div>
      <div
        className="row"
        style={{
          opacity: isStale ? "0.5" : "1",
          transition: isStale
            ? "opacity 0.2s 0.2s linear"
            : "opacity 0s 0s linear",
        }}
      >
        <CustomerTable
          sortedCustomers={numberToDisplayCustomers}
          deleteCustomer={deleteCustomer}
          updateCustomer={updateCustomer}
        />
      </div>
      <PageLink
        page={page}
        handlePageChange={handlePageChange}
        filteredCustomers={filteredCustomers}
        numberToDisplay={numberToDisplay}
      />
    </>
  );
}

export default Customers;
