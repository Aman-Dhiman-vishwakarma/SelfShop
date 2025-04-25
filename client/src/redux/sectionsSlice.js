import {createSlice} from "@reduxjs/toolkit";
const sectionsSlice = createSlice({
    name:"sections",
    initialState:{
        bottomSections:[],
        section:null
    },
    reducers:{
        setBottomSections:(state, action)=> {
            state.bottomSections = action.payload
        },
        setSections:(state, action)=>{
          state.section = action.payload
        }
    }
});

export const {setBottomSections, setSections} = sectionsSlice.actions;
export default sectionsSlice;