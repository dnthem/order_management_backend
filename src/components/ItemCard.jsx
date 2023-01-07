import { useEffect, useRef, useState } from "react";

/**
 * 
 * @param {*} props - title, price, content, remove callback, cardID, isMenu?
 * @returns 
 */
function ItemCard(props) {
    const [cardProps, setCardProps] = useState({})
    const [edit, setEdit] = useState(false)
    const titleRef = useRef();
    const priceRef = useRef();
    const contentRef = useRef();

    const setChanges = (e) => {
      const title = titleRef.current.innerText;
      const price = priceRef.current.innerText;
      const content = contentRef.current.InnertText;
      const newProp = {
        title: title,
        price: Number(price),
        content: content
      }
      setCardProps(newProp);
      setEdit(!edit);
    }

    const remove = (e) => {
      props.remove(props.cardID)
      console.log('remove was called')
    }

    useEffect(() => {
        setCardProps(props)
    },[props])
    return ( 
        <div className={edit? 'card border-danger': 'card'} >
        <img  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
        <div className="card-body">
          <h5 ref={titleRef} contentEditable={edit} className="card-title">{cardProps.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted" contentEditable={edit}>
            Price: $<span ref={priceRef}>{cardProps.price}</span>
          </h6>
          <p ref={contentRef} data-name='content' className="card-text" contentEditable={edit}>
            {cardProps.content}
          </p>

          {!edit && <button className="btn btn-primary px-5" onClick={() => {setEdit(true)}}>Edit</button>}
          {edit && <button className="btn btn-primary px-5" onClick={setChanges}>Save</button>}

          <button onClick={remove} className="btn btn-danger ms-2 px-4">Remove</button>
        </div>
      </div>
     );
}

export default ItemCard;