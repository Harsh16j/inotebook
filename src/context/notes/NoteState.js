import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const s1={
        "name":"Harsh",
        "class":"12E"
    }
    const [state, setstate] = useState(s1)
    const update=()=>{
        setTimeout(()=>{
            setstate({
                "name":"Jason",
                "class":"12D"
            })
        },1000);
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;