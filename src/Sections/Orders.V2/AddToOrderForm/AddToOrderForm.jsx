import Backdrop from "../../../components/Backdrop";
import Customer from "./Customer";
import Menu from "./Menu";

function AddToOrderForm(props) {
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
                    zIndex: "1000",
                    boxShadow: "0 0 10px rgba(0,0,0,.5)",
                    minHeight: "80vh",
                }}
            >
                <div className="row" >
                    <Customer/>
                    
                    <Menu/>

                </div>
            </div>
        </>
      );
}

export default AddToOrderForm;