import { AccessDB } from 'react-indexed-db';
import { useIndexedDB } from 'react-indexed-db';
 
export default function PanelExample() {
    const db = useIndexedDB('people');
    console.log(db);
  return (
    <AccessDB objectStore="people">
      {db => {
        console.log('MyDB: ', db);
        return <div>{JSON.stringify(db)}</div>;
      }}
    </AccessDB>
  );
}