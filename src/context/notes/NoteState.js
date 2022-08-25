import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "62fe49536cc46f3fe05675fb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "My title updated23456",
          "description": "Please wake up early updated23456",
          "tag": "personal updated23456",
          "date": "2022-08-18T14:14:43.611Z",
          "__v": 0
        },
        {
          "_id": "62ff92a2490be734b1289afb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "Conc running",
          "description": "Please wake up early23",
          "tag": "personal23",
          "date": "2022-08-19T13:39:46.971Z",
          "__v": 0
        },
        {
          "_id": "62ff92a2490be734b1289afb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "Conc running",
          "description": "Please wake up early23",
          "tag": "personal23",
          "date": "2022-08-19T13:39:46.971Z",
          "__v": 0
        },
        {
          "_id": "62ff92a2490be734b1289afb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "Conc running",
          "description": "Please wake up early23",
          "tag": "personal23",
          "date": "2022-08-19T13:39:46.971Z",
          "__v": 0
        },
        {
          "_id": "62ff92a2490be734b1289afb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "Conc running",
          "description": "Please wake up early23",
          "tag": "personal23",
          "date": "2022-08-19T13:39:46.971Z",
          "__v": 0
        },
        {
          "_id": "62ff92a2490be734b1289afb",
          "user": "62fc8c20e4423097f81bac01",
          "title": "Conc running",
          "description": "Please wake up early23",
          "tag": "personal23",
          "date": "2022-08-19T13:39:46.971Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;