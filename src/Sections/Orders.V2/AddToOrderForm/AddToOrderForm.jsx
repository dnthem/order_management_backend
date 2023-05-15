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
                className={`col-md-12 col-xl-10 p-3 bg-light`}
                style={{
                    borderRadius: "5px",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                    boxShadow: "0 0 10px rgba(0,0,0,.5)",
                }}
            >
                <div className="row position-relative" style={{
                    height: "90dvh",
                    
                }}>
                    <Customer/>
                    
                    <Menu  menu={menu}/>

                </div>
            </div>
        </>
      );
}

export default AddToOrderForm;