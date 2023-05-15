function CloseBtn({onClick, onDoubleClick}) {
    return ( 
        <button
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