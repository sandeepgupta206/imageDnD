import React,{useState,useEffect} from 'react'
import { openDB } from "idb";

function TestFour() {

    const [text, settext] = useState('');
    const [file, setfile] = useState('');

useEffect(()=>{
    (async ()=>{
        await openDB('DnD',1,{
            upgrade(db){
                db.createObjectStore('imgStore',{
                    autoIncrement:true
                })
            }
        });
    })();
},[]);

const addData =(e)=>{
e.preventDefault();
(async()=>{
    const db =await openDB('DnD',1);
    console.log(db);
    const tx = db.transaction('imgStore', 'readwrite');
    console.log(tx);
    const store =  tx.objectStore('imgStore')
    console.log(store);
     store.put({title: text,image:file});
    await tx.done;
    // console.log(store);
})();
}

const onImageChange=(e)=>{
    const file = e.target.files;
    setfile(URL.createObjectURL(file[0]));
}


  return (
 <>
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
              onChange={onImageChange}
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
  )
}

export default TestFour