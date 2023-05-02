import { TiTick } from "react-icons/ti";

function OrderCardV2({ order, onRemove, onComplete, onEdit }) {
  return (
    <div
      className="col-xl-3 col-lg-3 mx-1 my-2"
      style={{ backgroundColor: "lightblue", borderRadius: "20px" }}
    >
      <div className="card-body" style={{ position: "relative" }}>
        <button
          className="btn rounded-circle btn-outline-primary"
          style={{ position: "absolute", right: "0", top: ".5em", color: "white", backgroundColor: "black", fontWeight: "bold"}}
        >
          X
        </button>
        <div className="header">
          <h5 className="card-title">Your name</h5>
          <h6 className="card-subtitle mb-2 text-muted">913-215-4632</h6>
          <h6 className="card-subtitle mb-2 text-muted">$23 - zelle</h6>
          <h6 className="card-subtitle mb-2 text-muted">03:15pm</h6>
        </div>

        <ul className="list-group" style={{ listStyle: "none" }}>
          <li className="">1 banh trang tron</li>
          <li className="">2 xoi chien</li>
          <li className="">2 đá me</li>
          <li className="">...</li>
        </ul>
        <div className="d-flex flex-row-reverse my-2">
          <button className="btn btn-outline-primary">Complete</button>
        </div>
      </div>
    </div>
  );
}

export default OrderCardV2;
