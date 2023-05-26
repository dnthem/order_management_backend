import Backdrop from "./Backdrop";

function Loader(props) {
    return ( 
        <>
        <Backdrop/>
        <div style={{
            zIndex: '9999',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div clasName="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="text-light">Loading...</span>
            </div>
        </div>
        </>
        
     );
}

export default Loader;