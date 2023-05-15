import { useRef } from "react";


function MenuTableCard(props) {
    const trRef = useRef();
    const handleOnclick = () => {

        trRef.current.classList.remove('fade-out');
        trRef.current.classList.add('fade-out');
        setTimeout(() => {
            trRef.current.classList.remove('fade-out');
        },1000);

        props.select(props.cardID);
    }

    return ( 
        <tr ref={trRef}>
            <td style={{verticalAlign:'middle'}}>
                <img src={props.Photo !== undefined? URL.createObjectURL(props.Photo):'/template.jpg'} alt="" width={'100vw'} /> {props.Title}
            </td>
            <td style={{verticalAlign:'middle'}}>${props.Price}</td>
            <td colSpan={2}  style={{verticalAlign:'middle'}}><button className="btn" onClick={handleOnclick}>select</button></td>
        </tr>
     );
}

export default MenuTableCard;