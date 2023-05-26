import {FaRegTrashAlt} from 'react-icons/fa';

function CustomerOrderCard(props) {
    const item = props.item;
  return (
    <li 
      data-test-id="customer-cart-card"
      className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ width: "15ch", whiteSpace: "nowrap", overflow: "auto" }}>
          {props.id + 1}. {item.name}
        </span>
        <span>${item.price}</span>
        <div className="btn-group d-flex align-items-center">
          <select value={item.quantity} onChange={(e) => props.updateQuantity(item.id, e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">6</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </div>
        <button 
          data-test-id="remove-item-from-cart-btn"
          type="button" onClick={() => props.removeOrder(item.id)} className="btn btn-sm">
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
}

export default CustomerOrderCard;
