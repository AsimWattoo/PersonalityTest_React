import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type File = {
    id: string,
    fileName: string,
    propertySection: string,
    mainSection: string,
    property: string,
    state: string,
    questionIndex: number,
    url: string,
}

interface FilesState {
    files: File[]
}

let initialState = {
    files: []
} as FilesState

export const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile: (state, action: PayloadAction<File>) => {
            state.files.push(action.payload);
        },
        resetFiles: (state, action) => {
            for(let file of state.files) {
                if(file.state == "added")
                    URL.revokeObjectURL(file.url);
            }
            state.files = [];
        },
        removeFile: (state, action: PayloadAction<File>) => {
            let newFiles = state.files.filter(file => file.fileName!== action.payload.fileName && file.mainSection == action.payload.mainSection && file.propertySection == action.payload.propertySection && file.questionIndex == action.payload.questionIndex);
            //No file found then add a link to remove the file
            if(newFiles.length == state.files.length) {
                state.files.push(action.payload)
            } else {
                state.files = newFiles;
            }
        }
    }
});

export type {File}

export const {addFile, resetFiles, removeFile} = fileSlice.actions

export default fileSlice.reducer