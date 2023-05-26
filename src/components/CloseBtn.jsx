function CloseBtn({onClick, onDoubleClick, dataTestId}) {
    return ( 
        <button data-test-id={dataTestId}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className="btn"
            style={{
              position: "absolute",
              right: "-.5em",
              top: ".0em",
              color: "black",
              fontWeight: "bold",
            }}
          >
            X
          </button>
     );
}

export default CloseBtn;