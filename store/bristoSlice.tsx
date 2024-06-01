import { createSlice } from '@reduxjs/toolkit';
import { MenuTypes } from '../types/bristo';

interface initialTypes {
    localMenus: MenuTypes[];
}

const initialState: initialTypes = {
    localMenus: [],
};

const bristoConfigSlice = createSlice({
    name: 'bristo',
    initialState: initialState,
    reducers: {
        setLocalMenu(state, { payload }) {
            localStorage.setItem('localMenus', JSON.stringify(payload));
        },
        changeMenuByLanguage(state, { payload }) {
            const mapMenu = JSON.parse(localStorage.getItem('localMenus') || '');
            const currentMenu = mapMenu.find((menu: { locale: string }) => menu.locale === payload);
            switch (payload) {
                case 'cz':
                    const menuCz = mapMenu.find((menu: { locale: string }) => menu.locale === 'cs');
                    state.localMenus = menuCz.menu;
                    break;
                case 'vn':
                    const menuVi = mapMenu.find((menu: { locale: string }) => menu.locale === 'vi');
                    state.localMenus = menuVi.menu;
                    break;
                default:
                    state.localMenus = currentMenu.menu;
                    break;
            }
        },
    },
});

export const { setLocalMenu, changeMenuByLanguage } = bristoConfigSlice.actions;

export default bristoConfigSlice.reducer;
