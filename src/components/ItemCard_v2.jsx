import { useEffect, useRef, useState } from "react";
import { GetDataBaseContext } from "../App";
import indexedDBController from "../indexedDB/indexedDB";

function ItemCardV2(props) {
    const [cardProps, setCardProps] = useState({})
    const [edit, setEdit] = useState(false)
    const {db} = GetDataBaseContext();
    const titleRef = useRef();
    const priceRef = useRef();
    const contentRef = useRef();
    const imageRef = useRef();

    const setChanges = (e) => {
      const Title = titleRef.current.innerText;
      const Price = priceRef.current.innerText;
      const Content = contentRef.current.textContent;
      const Photo = imageRef.current.files[0];

      const newProp = {...cardProps}

      newProp.Title = Title? Title: newProp.Title;
      newProp.Price = Price? Number(Price): Number(newProp.Price);
      newProp.Content = Content? Content: newProp.Content;
      newProp.Photo = Photo? Photo: newProp.Photo;
      // update database
      const newData = {
        Content: newProp.Content,
        Photo: newProp.Photo,
        Title: newProp.Title,
        Price: newProp.Price,
        id: props.cardID,
        Count: props.Count,
      }
      indexedDBController.updateARecord(db, 'Menu', newData)
      // update current card
      props.updateMenu(newData)
      // setCardProps(newProp);
      setEdit(false);
    }

    const remove = (e) => {
      if (!confirm('Are you sure to remove this item')) return;
      props.remove(props.cardID)
      console.log('remove was called')
    }

    useEffect(() => {
        const checkStatus = () => {
          if (props.Title === undefined || props.Title === null) setEdit(true);
        }
        checkStatus();
        setCardProps(props)

    },[props])

    const selectHandler = (e) => {
      if (!edit) return;
      const target = e.target;
      window.getSelection().selectAllChildren(target);
    }

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 my-2">
    <div className={edit? 'card border-danger': 'card'}>

      <img src={cardProps.Photo !== undefined? URL.createObjectURL(cardProps.Photo):'/template.jpg'} className="card-img-top" alt={cardProps.Title} />
      {edit && <input type='file' ref={imageRef}/>}

      <div className="card-body">
        <h5 ref={titleRef} contentEditable={edit} suppressContentEditableWarning={true} className="card-title" style={{outline: 'none'}} onClick={selectHandler}>
          {cardProps.Title}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted" >
            Price: $<span ref={priceRef} contentEditable={edit} suppressContentEditableWarning={true} style={{outline: 'none'}} onClick={selectHandler}>{cardProps.Price}</span>

        </h6>
        <p ref={contentRef} data-name='content' className="card-text" contentEditable={edit} suppressContentEditableWarning={true}  style={{outline: 'none'}} onClick={selectHandler}>
          {cardProps.Content}
        </p>
        <div class="d-grid gap-2">
          <button onClick={remove} className="btn btn-danger" type="button" disabled={edit?true:false}>Remove</button>

          {!edit && <button className="btn btn-primary" type="button" onClick={() => {setEdit(true)}}>Edit</button>}
          {edit && <button className="btn btn-primary "  type="button"onClick={setChanges}>Save</button>}

          
        </div>
      </div>
    </div>
    </div>
  );
}

export default ItemCardV2;
