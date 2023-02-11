import { useEffect, useState } from 'react';
import { Container, Button, Form, Table, Modal } from 'react-bootstrap';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import "./style.css"

function App() {
  const db = getDatabase();

  let [todolist, setTodolist] = useState("");
  let [todoDes, setTodoDes] = useState("");
  let [todoerr, setTodoerr] = useState("");
  let [todoDeserr, setTodoDeserr] = useState("");
  let [todoArr, setTodoArr] = useState([]);
  let [change, setChange] = useState(true);
  let [open, setOpen] = useState(false);
  let [todoEdit, setTodoEdit] = useState("");
  let [todoEditDes, setTodoEditDes] = useState("");
  let [editid, setEditid] = useState(""); 

  let todo = (e)=> {
    setTodolist(e.target.value);
    setTodoerr("");
  }
  let todoTwo = (e)=> {
    setTodoDes(e.target.value);
    setTodoDeserr("");
  }

  let handleSubmit = (e)=> {
    e.preventDefault();
    if (todolist != "") {
      }else{
        setTodoerr("Please Enter Task!");
      }
      if (todoDes != "") {
        set(push(ref(db, 'todolist')), {
              task: todolist,
              taskDes: todoDes,
            }).then(()=>{
              setChange(!change);
              setTodolist("")
              setTodoDes("")
            })
      }else{
        setTodoDeserr("Please Enter Task Description!");
      }
  }

  useEffect(()=>{
    const todoRef = ref(db, 'todolist');
    let arr =[];
    onValue(todoRef, (snapshot)=>{
    const data = snapshot.val();
    snapshot.forEach((item)=>{
      let taskinfo = {
        id: item.key,
        task: item.val().task,
        taskDes: item.val().taskDes,
      }
    arr.push(taskinfo);
    })
    setTodoArr(arr);
});
  },[change])

  let handleDelete = (id)=>{
    const todoRef = ref(db, 'todolist/'+ id);
    remove(todoRef).then(()=>{
      setChange(!change);
    })
  }

  let handleEdit = (e)=> {
    e.preventDefault();
    const todoRef = ref(db, 'todolist/'+ editid);
    update(todoRef, {
      task: todoEdit,
      taskDes: todoEditDes,
    }).then(()=>{
      setChange(!change);
      setOpen(false);
    })
  }

  let handleOpen = (id)=> {
    setOpen(true);
    setEditid(id);
  }

  return (
    <Container>
      <Form className='form_one'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task:</Form.Label>
        <Form.Control onChange={todo} type="text" placeholder="Add Your Task" value={todolist}/>
        {todoerr!=""?<Form.Text className="text-muted">
        {todoerr}
        </Form.Text>:""}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Description:</Form.Label>
        <Form.Control onChange={todoTwo} type="text" placeholder="Add Your Task" value={todoDes}/>
        {todoDeserr!=""?<Form.Text className="text-muted">
        {todoDeserr}
        </Form.Text>:""}
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Add
      </Button>
    </Form>
    
    <br></br>

    <Table className='table' striped bordered hover >
      <thead>
        <tr>
          <th>Task</th>
          <th>Task Description</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {todoArr.map(item=>(
        <tr>
          <td>{item.task}</td>
          <td>{item.taskDes}</td>
          <td><Button onClick={()=>handleDelete(item.id)} variant="danger">Delete</Button></td>
          <td><Button onClick={()=>handleOpen(item.id)} variant="primary"type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</Button></td>
        </tr>
          ))}
      </tbody>
    </Table>

        {open && <div className='mymodal'>
          
          <Form>
          <button className='close' onClick={()=>setOpen(false)}>Close</button>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Edit Task:</Form.Label>
        <Form.Control onChange={ (e)=>{setTodoEdit(e.target.value)} } type="text" placeholder="Edit Task" value={todoEdit}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Edit Task Description:</Form.Label>
        <Form.Control onChange={ (e)=>{setTodoEditDes(e.target.value)} } type="text" placeholder="Edit Task Description" value={todoEditDes}/>
      </Form.Group>

      <Button onClick={handleEdit} variant="primary" type="submit">
        Add
      </Button>
    </Form>
    </div>}
    </Container>
  );
}

export default App;
