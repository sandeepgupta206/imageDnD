import React, { useState, useEffect } from "react";
import { openDB } from "idb";

function TestFive() {
  const [text, settext] = useState("");
  const [file, setfile] = useState("");
  const [arr,setarr] = useState([])
  const [imgArr,setImgArr] = useState([])
  const [i,seti] = useState([])
  let db;
  const request = indexedDB.open("imgDnD");

  request.onsuccess = function(){
    db = request.result;
    console.log(db);
  }

  request.onupgradeneeded =(e)=>{
    let db = e.target.result;
    let dbStore = db.createObjectStore('book',{
      autoIncrement:true, keyPath:'id'
    })
  }

  const addData=(e)=>{
e.preventDefault();
let data={
  imagesName:text,
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

const showData=()=>{
  // db.transaction("book").objectStore("book").getAll().onsuccess = event => {
  //   console.log(JSON.stringify(event.target.result));
  //   setarr(JSON.stringify(event.target.result))
  // }

let req = db.transaction('book','readonly')
.objectStore('book')
.openCursor();

req.onsuccess=()=>{
  console.log(req.result)
  const cursor = req.result;
if(cursor){
  let imgValue = req.result.value.imageFile[0].name;
  seti(req.result.value.files.name)
  setImgArr([...imgArr,imgValue]);
 console.log(req.result.value.imageFile[0].name);
 alert(imgValue);
}
else{
  console.log('no more entries')
}

}



  
}


console.log(imgArr)
console.log(i);
console.log(imgArr[0])





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
            <input
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              placeholder="Enter Image lable"
            ></input>

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
                // value={file}
                multiple
                onChange={(e) => setfile(e.target.files)}
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
        

            {/* <img src={window.URL.createObjectURL(i[0])} alt="img" width="100" height="50" /> */}
         
      

         
        
        </div>
      </div>
    </>
  );
}

export default TestFive;
