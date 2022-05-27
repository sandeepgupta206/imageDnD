import React, { useState, useEffect } from "react";
import { openDB } from "idb";

function TestFive() {
  const [text, settext] = useState("");
  const [file, setfile] = useState("");
  let [db,setdb] = useState(null)



  useEffect(() => {
    createStore();
    viewData();
  },[file]);

  

  function addData(e) {
    e.preventDefault();

    const inputData = {
      imageTitle: text,
      image: file,
    };

    console.log(text);
    console.log(db);
    console.log(file);
    let txt = db.transaction("images", "readwrite");
    const imageStore = txt.objectStore("images");
    imageStore.put(inputData);
  }

  const viewData = ()=>{
    //   const trans = db.transaction("images", "readwrite");
    //   const iStore = trans.objectStore('images');
    // const request =   iStore.openCursor();
    // request.onsuccess = e =>{
    //     const cursor = e.target.result
    //     console.log(cursor);
    // }

    // db.transaction('images').objectStore('images').getAll().onsuccess=e=>{
    //     console.log(e.target.result);
    // }



  }

  const createStore = () => {
    const request = indexedDB.open("imgDnD");

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      setdb(db)
      db.createObjectStore("images", {
        autoIncrement: true,
      });
console.log(db);

    };
    request.onsuccess = (e) => {
      // alert ('success Called')
    };

  };

  

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
          <img src="" alt="img" width="100" height="50" />
        </div>
      </div>
    </>
  );
}

export default TestFive;
