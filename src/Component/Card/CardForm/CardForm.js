import { useState } from "react";

const CardForm = (props) =>{
const [name,setName] = useState(null);
const [status,setStatus] = useState(null);

const onNameChange = (event) =>{
    setName(event.target.value);
}

const onChangeStatusHandler = (event) =>{
    setStatus(event.target.value);
}

return(
<form onSubmit={(event) => props.onAddCardHandler({name,status}, event)} style={{display:"flex", width:"250px", justifyContent:'flex-end', marginLeft:'130px'}}>
    <p></p>
    <input name="title" placeholder="Title" value={name} name="title" type="text" onChange={onNameChange} />
    <select id={props.id} name="status"  value={status} onChange={onChangeStatusHandler}>
              <option value="TODO">Select Status</option>
              <option value="TODO">Todo</option>
              <option value="DOING">InProgress</option>
              <option value="DONE">Done</option>
    </select>
    <button>Add Card</button>
</form>)
}
export default CardForm; 