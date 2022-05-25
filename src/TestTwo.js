import React from "react";
import { useState, useEffect } from "react";

function TestTwo() {
  const [text, settext] = useState();

  const [file, setfile] = useState();

  let db;
//   let store;

  useEffect(() => {
      let db;
      let objectStore;

    // open db

    let requestDB = window.indexedDB.open("imgDB",1);
    
    requestDB.onsuccess=(event)=>{
        db = event.target.result;
        console.log(db);

        objectStore = db.createObjectStore('imageStore',{
            autoIncrement: true,
          })
      
    }

  
  });

  const addData=()=>{

  }

  return (
    <>
      <div>
        <div style={{ width: "150px ", height: "250px", padding: "5px" }}>
          <form>
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
    </>
  );
}

export default TestTwo;
