import { useEffect, useRef } from "react";

function OrderCard(props) {
    const trRef = useRef();
    useEffect(() => {
        if (props.recentChange) {
            trRef.current.classList.add('fade-out');
            setTimeout(() => {
                trRef.current.classList.remove('fade-out');
                props.setRecentChange(-1);
            },2000);
        }
    },[props.recentChange])
    return ( 
        <tr ref={trRef}>
            <td>{props.Title}</td>
            <td>{props.Price}</td>
            <td>{props.Quantity}</td>
            <td>{props.Total}</td>
        </tr>
     );
}

export default OrderCard;