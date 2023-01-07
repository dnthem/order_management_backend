import { useEffect, useRef, useState } from "react";
import { GetDataBaseContext } from "../App";

function ItemCardV2(props) {
    const [cardProps, setCardProps] = useState({})
    const [edit, setEdit] = useState(false)
    const {db} = GetDataBaseContext();
    const titleRef = useRef();
    const priceRef = useRef();
    const contentRef = useRef();
    const imageRef = useRef();

    const setChanges = (e) => {
      const title = titleRef.current.innerText;
      const price = priceRef.current.innerText;
      const content = contentRef.current.InnertText;
      const newProp = {...cardProps}
      // handle Image

      newProp.title = title;
      newProp.price = Number(price);
      newProp.content = content;
      
      // update database

      // update current card
      setCardProps(newProp);
      setEdit(false);
    }

    const remove = (e) => {
      props.remove(props.cardID)
      console.log('remove was called')
    }

    useEffect(() => {
        const checkStatus = () => {
          if (props.Title === undefined) setEdit(true);
        }
        checkStatus();
        setCardProps(props)

    },[props])

  return (
    <div className="col-xl-3 col-md-6">
    <div className={edit? 'card border-danger': 'card'} style={{width:'15rem'}}>

      <img src={cardProps.Photo !== undefined? URL.createObjectURL(cardProps.Photo):'/template.jpg'} className="card-img-top" alt={cardProps.Title} />
      {edit && <input type='file' ref={imageRef}/>}

      <div className="card-body">
        <h5 ref={titleRef} contentEditable={edit} suppressContentEditableWarning={true} className="card-title">{cardProps.Title}</h5>
        <h6 className="card-subtitle mb-2 text-muted" >
            Price: $<span ref={priceRef} contentEditable={edit} suppressContentEditableWarning={true}>{cardProps.Price}</span>
        </h6>
        <p ref={contentRef} data-name='content' className="card-text" contentEditable={edit} suppressContentEditableWarning={true}>
          {cardProps.Content}
        </p>

        {!edit && <button className="btn btn-primary" onClick={() => {setEdit(true)}}>Edit</button>}
        {edit && <button className="btn btn-primary " onClick={setChanges}>Save</button>}

        <button onClick={remove} className="btn btn-danger ms-2">Remove</button>
      </div>
    </div>
    </div>
  );
}

export default ItemCardV2;
