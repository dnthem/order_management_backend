import Backdrop from "../../../components/Backdrop";
import { useData } from "../customHooks/useData";
import Customer from "./Customer";
import Menu from "./Menu";

function AddToOrderForm(props) {
    const [menu, setMenu] = useData({
        store: "Menu",
        index: "id",
        keyPath: '',
    })
    return ( 
        <>
            <Backdrop show={props.showForm} setShow={props.setShowForm}/>
            <div
                className={`col-md-12 col-xl-10 p-3 bg-white border rounded-3 shadow-lg`}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                }}
            >
                <div className="row position-relative" style={{
                    height: "80dvh",
                    
                }}>
                    <Customer/>
                    
                    <Menu  menu={menu}/>

                </div>
                <div className="row pt-3 border-top bg-">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary">Add to Order</button>
                        <button className="btn btn-danger ms-2" onClick={() => props.showForm(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
      );
}

export default AddToOrderForm;