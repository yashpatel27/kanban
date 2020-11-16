import React from 'react';
import './Card.css';

const Card = (props) => {
   return(
       <div style={{ wordWrap: "break-word"}}>
          <span className="Left">Title : </span>  
          <span className="Left"><p style={{fontStyle:"italic",fontSize:"small"}}> {props.name}</p></span>
          <span className="clear"></span>
          <span className="Left">Status: </span>
          <select id={props.id}  className="Right" value={props.status} onChange={props.onChangeStatusHandler}>
              <option value="TODO">Todo</option>
              <option value="DOING">InProgress</option>
              <option value="DONE">Done</option>
          </select>
          <button className="Left" onClick={() =>props.onDeleteCardHandler(props.id)}>Delete</button>  
       </div>
   );
}
export default React.memo(Card);