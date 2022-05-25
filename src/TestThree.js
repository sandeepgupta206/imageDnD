import React from "react";
import { useState, useEffect } from "react";

function TestThree() {
  const [text, settext] = useState('');

  const [file, setfile] = useState('');

  
  var db ;
  var objectStore = null;
  var store;
  var requestDB;
  var transaction;
  console.log(text);
  console.log(file);

useEffect(()=>{

    requestDB = window.indexedDB.open("imgDB");

    requestDB.onupgradeneeded = () => {
       db = requestDB.result;
       console.log(db) ;
      store = db.createObjectStore("imageDB", {
        autoIncrement: true,
     
      });
      console.log(db);
     
    };
})


  const addData = (e) => {
    
    e.preventDefault();
    // store.put({imageName:text, img:file})
    let formData = {
      title:text,
     image: file,
    };
    transaction=db.transaction("imageDB", "readwrite");
    console.log(db)
    
    transaction.oncomplete = (value) => {
      console.log(value);
    };

    transaction.onerror = (err) => {
      console.log(err);
    };

    store = transaction.objectStore("imageDB");
    let request = store.put(formData);

    request.onsuccss = (ele) => {
      console.log("successfully added");
    };

    request.onerror = (ele) => {
      console.log("got error");
    };
  };

  return (
    <div>
      <div style={{ width: "150px ", height:"250px", padding: "5px" }}>
        <form>
          <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="Enter Image lable"
          ></input>
         
          <span style={{ backgroundColor: "lightGrey", padding: "2%" ,marginTop:'20px'}}>
            <input
              style={{
                backgroundColor: "lightGrey",
                height: "10%",
                width: "100%",
              }}
              type="file"
              // value={file}
              multiple
              onChange={(e) => setfile(e.target.value)}
            ></input>
          </span>
          <br />
          <br />
          <button onClick={addData}>add data</button>
        </form>
      </div>

      {/* SHOW DATA DIV */}

      <div>
        <img src="" alt="img" width="100" height="50" />
      </div>

     
    </div>
  );
}

export default TestThree;
