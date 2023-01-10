import imgTemplate from '../assets/template.jpg'

function MenuTableCard(props) {
    return ( 
        <tr>
            <td style={{verticalAlign:'middle'}}>
                <img src={props.Photo !== undefined? URL.createObjectURL(props.Photo):imgTemplate} alt="" width={'100vw'} /> {props.Title}
            </td>
            <td style={{verticalAlign:'middle'}}>{props.Price}</td>
            <td colSpan={2}  style={{verticalAlign:'middle'}}><button className="btn" onClick={() => props.select(props.cardID)}>select</button></td>
        </tr>
     );
}

export default MenuTableCard;