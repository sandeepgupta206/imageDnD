import "./App.css";
import React,{useState,useEffect} from "react";

 function App() {

const [text, settext] = useState();

const [file, setfile] = useState()


  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
  }

 const addData =(e)=>{
   e.preventDefault();



  const requestDB = window.indexedDB.open('imgDB');

  requestDB.onupgradeneeded=()=>{
    let db = requestDB.result;
  let store =  db.createObjectStore('imageDB', {
      autoIncrement:true
    });

    // put method

    store.add({imageName:text, img:file})
  }

  settext('');
setfile();
requestDB.onsuccess = ()=>{
  if(requestDB.readyState == 'done'){
    console.log('data added successfully into indexedDB')
  }
 
}

 }

 console.log(file);


 

  return (
    <>
      <div style={{margin:'25% 40%', padding:'25px'}}>
        <form>
        <input
        type='text'
        value={text}
        onChange={(e)=>settext(e.target.value)}
        placeholder='Enter Image lable'
        >
        </input>
        <h3>Drag and Drop here</h3>
        <span 
         style={{backgroundColor:'lightGrey', padding:'10%'}}
        >
          <input
          style={{backgroundColor:'lightGrey', height:'10%', width:'100%'}}
          type='file'
          // value={file}
          multiple
          onChange={(e)=>setfile(e.target.files[0])}
          >
          </input>
        </span>
        <br />
        <br />
        <button
        onClick={addData}
        >
          add data
        </button>
        </form>

      </div>
    </>
  );
  }



export default App;
