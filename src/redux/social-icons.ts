import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SocialIcon = {
    quizId: string,
    id: string,
    icon: string,
    url: string
}

type SocialIconUpdate = {
    id: number,
    icon: string,
    url: string
}

type SocialIconAdd = {
    quizId: string,
    icon: string,
    url: string
}

interface SocialIconsState {
    icons: SocialIcon[] | null,
}

let initialState = {icons:[] } as SocialIconsState

export const socialIconsSlice = createSlice({
    name: "social",
    initialState: initialState,
    reducers: {
        setIcons(state, action: PayloadAction<SocialIcon[]>) {
            state.icons = action.payload;
        },
        resetIcons(state, action) {
            state.icons = null;
        },
        addIcon(state, action: PayloadAction<SocialIconAdd>) {
            if(!state.icons) {
                state.icons = []
            }

            state.icons.push({
                id: "",
                quizId: action.payload.quizId,
                icon: action.payload.icon,
                url: action.payload.url
            })
        },
        updateIcon(state, action: PayloadAction<SocialIconUpdate>) {
            if(state.icons) {
                state.icons[action.payload.id].url = action.payload.url;
                state.icons[action.payload.id].icon = action.payload.icon;
            }
        },
        deleteIcon(state, action: PayloadAction<number>) {
            if(state.icons) {
                state.icons = state.icons.filter((icon, index) => index != action.payload);
            }
        }
    }
});

export type {SocialIcon, SocialIconAdd, SocialIconUpdate}

export const {setIcons, resetIcons, addIcon, updateIcon, deleteIcon} = socialIconsSlice.actions;

export default socialIconsSlice.reducer;