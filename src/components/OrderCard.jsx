function OrderCard(props) {
    return ( 
        <tr>
            <td>{props.Title}</td>
            <td>{props.Price}</td>
            <td>{props.Quantity}</td>
            <td>{props.Total}</td>
        </tr>
     );
}

export default OrderCard;