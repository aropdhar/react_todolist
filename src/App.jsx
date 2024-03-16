import { useEffect, useState } from "react";
import { getDatabase, ref, set , push , onValue , remove , update } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

let [text , setText] = useState("");
let [alltodo , setAlltodo] = useState([]);
let [show , setShow] = useState(true);
let [info , setInfo] = useState("");

  const db = getDatabase();

  let handletask = (e) =>{

    setText(e.target.value);

  }

  let handlebtn = () =>{

    if( text == ""){

      console.log("text ny");
    }

    else{
      
      set(push(ref(db , 'todolist')), {
       
        mytext: text,

      }).then(()=>{

        console.log("Success DataStore");

        // toast package  section 

        toast('🦄 Data Created SuccessFull', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

          });
        
          setText("")

      });
    }
  }

  // Read Operation

  useEffect(()=>{

    const todoRef = ref(db, 'todolist');
    onValue(todoRef, (snapshot) => {
      
      let arr = []
  
      snapshot.forEach((item)=>{
  
        arr.push({...item.val() , id: item.key})
  
      })
      
      setAlltodo(arr);
  
    });
  

  },[]);

  // delete section

  let handledelete = (deleteid) =>{

    remove(ref(db , 'todolist/' + deleteid));

    // toast package  section 

    toast('🦄 Delete SuccessFull', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });

  }

  // Edit Section Start Here

  let handleEdit = (editinfo) =>{
    
    setText(editinfo.mytext);
    setShow(false);
    setInfo(editinfo);

  }

  // Edit Section End Here

  // update Section start Here

  let handleUpdate = () =>{
 
  update(ref(db , "todolist/" + info.id),{
  
    mytext: text,

  }).then(()=>{

    setShow(true);
        // toast package  section 

        toast('🦄 Updated Successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
    
          });
    
  })  

  }

  // update Section end Here

  return (
    <>
    {/* toastify package Start Here */}
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    {/* toastify package End Here*/}
        
        <div className="input_main">
          <div className="input_design">
              <input onChange={handletask} name="name" type="text" value={text} placeholder="Enter Your Task"/>

              {show
              
              ?

              <button onClick={handlebtn}>Submit</button>
              :

              <button onClick={handleUpdate}>Update</button>
              }
          </div>


            <div className="task_main">
                <ul>
                  {alltodo.map((item , index)=>(                                    
                        <li key={index} className="task_card">{item.mytext} 
                              <button onClick={()=>handledelete(item.id)}>Delete</button>
                              <button onClick={()=>handleEdit(item)}>Edit</button>
                          </li>
                    ))
                  }
                </ul>
            </div>

        </div>

      
    </>
  )
}

export default App
