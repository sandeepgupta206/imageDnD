import React from 'react';
import {useState,useEffect} from "react";


function TestOne() {
    const [text, settext] = useState();

    const [file, setfile] = useState();

    let addData;
    (function init(){
let db = null;
let objectStore = null;
const requestDB = window.indexedDB.open('imgDB');
let store;

requestDB.onupgradeneeded=()=>{
    let db = requestDB.result;
   store =  db.createObjectStore('imageDB', {
      autoIncrement:true});
  }


   addData=(e)=>{
      e.preventDefault();
    // store.put({imageName:text, img:file})
let formData = {
    text,
    file
}

let tx = db.transaction('imageDB', 'readwrite')

tx.oncomplete = (value)=>{
    console.log(value);
}

tx.onerror = (err)=>{
    console.log(err)
}

store  =tx.objectStore('imageDB');
let request = store.add(formData);

request.onsuccss=ele=>{
    console.log('successfully added');
}

request.onerror=ele=>{
    console.log('got error');
}


  }


    })();


  return (
    <div>

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

    </div>
  )
}

export default TestOne;