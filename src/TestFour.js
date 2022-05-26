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
    // console.log(store);
})();
}

const onImageChange=(e)=>{
    const file = e.target.files;
    setfile(file);
}



  return (
 <>
  <div>
      <div style={{ width: "150px ", height:"250px", padding: "5px",margin:'15px' }}>
        <form style={{width:'100%',height:'160px',borderRadius:'5px',border:'2px dashed', color:'red' , fontSize:'0.9rem', fontWeight:'500', display:'flex', justifyContent:'center', alignItem:'center',flexDirection:'column'}}>
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
                height: "60px",
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
          <button style={{marginTop:'15px'}} onClick={addData}>add data</button>
        </form>
      </div>

      {/* SHOW DATA DIV */}

      <div style={{ width:"100%", display:'flex', justifyContent:'flex-start',alignItem:'flex-start', flexWrap:'wrap', position:'relative', height:'auto', marginTop:'20px', maxHeight:'300px', overflowY:'auto'}}>
        <img src="" alt="img" width="100" height="50" />
      </div>

     
    </div>
 </>
  )
}

export default TestFour