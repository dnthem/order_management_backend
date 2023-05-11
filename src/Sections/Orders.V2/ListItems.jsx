import React, { useState } from 'react';
function ListItem(props) {
    const [showMore, setShowMore] = useState(false);
    function renderList() {
        return props.list.map((item, index, arr) => {
            if (index === 3 && !showMore) {
                return (
                    <li key={index}>
                        <button className='btn' onClick={() => setShowMore(true)}>...show more</button>
                    </li>
                )
                
            }
            else if (index > 3 && !showMore) {
                return null;
            }
            else if (index === arr.length - 1 && showMore) {
                return (
                    <>
                    <li key={index}>
                        {`${item[1]} x ${item[0]}`}
                    </li>
                    
                    <li key={index+1}>
                        <button className='btn' onClick={() => setShowMore(false)}>Show less</button>
                    </li>
                    </>
                )
            }
            else {
                return (
                    <li key={index}>
                        {`${item[1]} x ${item[0]}`}
                    </li>
                )
            }
        })
    }

    
    return ( 
        <ul className="list-group" style={{ listStyle: "none" }}>
            {renderList()}
        </ul>
     );
}

export default ListItem;