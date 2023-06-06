function SelectInput({ handleSortBy }) {
  return (
    <div className="d-flex input-group justify-content-end mt-4">
      <label htmlFor="sort-by" className="form-label me-2 mt-2">
        Sort By
      </label>
      <select
        className="form-select"
        aria-label="Sort by"
        onChange={(e) => handleSortBy(e.target.value)}
        style={{ maxWidth: "fit-content" }}
      >
        <option value="registerationDate">Registeration Date</option>
        <option value="customerName">Customer Name</option>
        <option value="phone">Phone Number</option>
        <option value="orderCount">Total Orders</option>
        <option value="totalSpent">Total Spent</option>
        <option value="lastPurchase">Last Purchase</option>
      </select>

    </div>
  );
}

export default SelectInput;
