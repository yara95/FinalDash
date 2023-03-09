import React, { useEffect } from "react";
import { Accordion, Badge, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import  { useState } from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };



  
      
  const singleClickHandler = (event) => {		
		console.log("single click");
	}

	const doubleClickHandler = (event) => {
		console.log("double click");
	}

    
  const [circle, setcircle] = useState([{} ]);

const addcircle = ()=>{
    setcircle([...circle, { } ])
  
}
const removcircle = (index)=>{
    const rows = [...circle];
    rows.splice(index, 1);
    setcircle(rows);
}
const handleChange = (index, evnt)=>{

const { name, value } = evnt.target;
const list = [...circle];
list[index][name] = value;
setcircle(list);
}


const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      {['Settings','Send email', 'Drafts'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);


  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>






              
           






{/* <>
    <button onClick={()=>handleAdd()}>Add</button>
        {val.map((data,i)=>{
            return(
               <div>
                    <input value={data} onChange={e=>handleChange(e,i)} />
                    <button onClick={()=>handleDelete(i)}>x</button>
               </div>
            )
        })}
    </> */}

            <div className="row">
                <div className="col-sm-8">
                  {
                      circle.map((data, index)=>{
                          const {fullName}= data;
                          return(
                            <div className="row my-3" key={index}>
                    <div className="col">
                    <div className="form-group">
                    
      
    
    {[''].map((anchor) => (
        <React.Fragment key={anchor}>
                    <button  
                    onClick={addcircle} 
                    onDoubleClick={toggleDrawer(anchor, true)}
                    style={{
                      color: "black",
                      padding:10,
                      margin:20,
                      display:"inline-block",
                      // position:'absolute',
                      
                      borderRadius: "50%",
                      width:100,
                      height:100,
                      left:0,
                      top:0
                  
                            }}
                    
                    type="Button" onChange={(evnt)=>handleChange(index, evnt)} value={fullName}  > {anchor} Childs </button>
<Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
                    
                    </div>
                    </div>
                    
                    <div className="col">

                 {(circle.length!==0)? <button className="btn btn-outline-danger" onClick={removcircle}>Remove</button>:''}

                    </div>
                  </div>
                          )
                      })
                  }
     
                <div className="row">
                    <div className="col-sm-12">

                    </div>
                </div>
                  </div>
                </div>
                <div className="col-sm-4">

                </div>
            


            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
