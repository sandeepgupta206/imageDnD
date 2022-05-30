import React, { useState, useEffect } from "react";
import { openDB } from "idb";

function TestSix() {
  const [text, settext] = useState("");
  const [file, setfile] = useState("");
  const [arr,setarr] = useState([])
  let db;
  const request = indexedDB.open("imgDnD");

  request.onsuccess = function(){
    db = request.result;
    console.log(db);
  }

  request.onupgradeneeded =(e)=>{
    let db = e.target.result;
    let dbStore = db.createObjectStore('book',{
      autoIncrement:true
    })
  }

  const addData=(e)=>{
e.preventDefault();
let data={
//   imagesName:text,
  imageFile:file
}
console.log(db)
let transaction = db.transaction(['book'],'readwrite');
console.log(transaction)

let dbStore = transaction.objectStore('book');

console.log(dbStore)
dbStore.add(data);
// request.onsuccess=()=>{
//  dbStore.add(data);
// }
  }

console.log(arr);

// console.log(imgArr)
// console.log(i);
// console.log(imgArr[0])



const showData=()=>{
    // db.transaction("book").objectStore("book").getAll().onsuccess = event => {
    //   console.log(JSON.stringify(event.target.result));
    //   setarr(JSON.stringify(event.target.result))
    //   setarr(JSON.stringify(event.target.result))
    
    // }
    const request = db.transaction('book')
    .objectStore('book')
    .getAll();
  
  request.onsuccess = ()=> {
  const book = request.result;
  
  console.log('Got all the students');
  console.log(book);
  console.table(book);
  setarr(book);
  }
  
  request.onerror = (err)=> {
      console.error(`Error to get all students: ${err}`)
  }


  }


  return (
    <>
      <div>
        <div
          style={{
            width: "150px ",
            height: "250px",
            padding: "5px",
            margin: "15px",
          }}
        >
          <form
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "5px",
              border: "2px dashed",
              color: "red",
              fontSize: "0.9rem",
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              flexDirection: "column",
            }}
          >
            {/* <input
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              placeholder="Enter Image lable"
            ></input> */}

            <span
              style={{
                backgroundColor: "lightGrey",
                padding: "2%",
                marginTop: "20px",
              }}
            >
              <input
                style={{
                  backgroundColor: "lightGrey",
                  height: "60px",
                  width: "100%",
                }}
                type="file"
                accept="image/*"
                // value={file}
                multiple
                onChange={(e) => setfile(URL.createObjectURL(e.target.files[0]))}
              ></input>
            </span>
            <br />
            <br />
            <button style={{ marginTop: "15px" }} onClick={addData}>
              add data
            </button>
            <button type="button" onClick={showData}>get Data </button>
          </form>
        </div>

        {/* SHOW DATA DIV */}

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItem: "flex-start",
            flexWrap: "wrap",
            position: "relative",
            height: "auto",
            marginTop: "20px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >



            {/* <img src={URL.createObjectURL(arr[0])} alt="img" width="100" height="50" /> */}


         
      

         
        
        </div>
      </div>
    </>
  );
}

export default TestSix;
