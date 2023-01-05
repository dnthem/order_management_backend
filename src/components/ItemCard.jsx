import { useEffect, useRef, useState } from "react";

function ItemCard(props) {
    const [cardProps, setCardProps] = useState({})
    const [edit, setEdit] = useState(false)
    const titleRef = useRef();

    const enableEdit = () => {
        setEdit(true);
        titleRef.current.focus();
    }

    useEffect(() => {
        setCardProps(props)
    },[props])
    return ( 
        <div className="card">
        <div className="card-body">
          <h5 ref={titleRef} contentEditable={edit} className="card-title">{cardProps.title}</h5>
          <h6  className="card-subtitle mb-2 text-muted" contentEditable={edit}>
            Price: {cardProps.price}
          </h6>
          <p className="card-text" contentEditable={edit}>
            {cardProps.content}
          </p>
          <button href="#" className="card-link" onClick={enableEdit}>Edit</button>
          <button href="#" className="card-link">Remove</button>
        </div>
      </div>
     );
}

export default ItemCard;