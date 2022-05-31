import React,{useState,useEffect} from 'react'
import { openDB } from "idb";

function TestFour() {

    const [text, settext] = useState('');
    const [file, setfile] = useState('');
    let db;
useEffect(()=>{
    (async ()=>{
        await openDB('DnD',1,{
            upgrade(db){
                db.createObjectStore('imgStore',{
                    autoIncrement:true
                })
            }
        });










        // let trans = db.transaction('imgStore','readonly');
        // let store = trans.objectStore('imgStore');
        // let getReg = store.getAll();
        // console.log(getReg);
        // getReg.onsuccess = e=>{
        //   console.log(e.targte);
        // }
        // getReg.onerror = e=>{
        //   console.log(e);
        // }

        
        // const request = indexedDB.open('DnD');
        // request.onsuccess = ()=>{
        //   const db = request.result;
        //   console.log(db);
        //   const store = db.transaction('imgStore', 'readonly');
        //   let getReq = store.result;
        // }
        

        // var transaction = db.transaction(["imgStore"]);
        // var objectStore = transaction.objectStore("imgStore");
        // var request = objectStore.get("0");
        // request.onerror = event => {
         
        // };
        // request.onsuccess = event => {
        //   // Do something with the request.result!
        //   console.log("Name for SSN 444-44-4444 is " + request.result.name);
        // };

            
    })();

});


// function getData(db,id){
//   const txt = db.transaction('imgStore','readonly');
//   const store = txt.objectStore('imgStore');

//   let query = store.get(id);
//   query.onsuccess = (event)=>{
//     if(!event.target.result){
//       console.log(`${id} not found`)
//     }
//     else{
//       console.table(event.targte.result);
//     }
//   }
//   query.onerror = event=>{
//     console.log(event.target.errorCode);
//   };

//   txt.oncomplete = ()=>{
//     db.close();
//   };
// };





const addData =(e)=>{
e.preventDefault();
(async()=>{
    const db =await openDB('DnD',1);
    const tx = db.transaction('imgStore', 'readwrite');
    const store =  tx.objectStore('imgStore')
     store.put({title: text,image:file});
    await tx.done;
    console.log(store);
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
      <div style={{ width: "250px ", height:"250px", padding: "5px",margin:'30px' }}>
        <form style={{width:'100%',height:'160px',borderRadius:'5px',border:'2px dashed', color:'red' , fontSize:'0.9rem', fontWeight:'500', display:'flex', justifyContent:'center', alignItem:'center',flexDirection:'column'}}>
          <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="Enter Image lable"
          ></input>
         
          <span style={{ backgroundColor: "lightGrey", padding: "2%" ,marginTop:'25px'}}>
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