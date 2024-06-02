import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BillingOrder, MenuTypes } from '../types/bristo';

interface initialTypes {
    localMenus: MenuTypes[];
    countNumberOrder: number;
    codeOrder: string;
    currentOrder: BillingOrder | null;
    totalItems: number;
}

const initialState: initialTypes = {
    localMenus: [],
    countNumberOrder: 0,
    codeOrder: 'to-go',
    currentOrder: null,
    totalItems: 0,
};

const bristoConfigSlice = createSlice({
    name: 'bristo',
    initialState: initialState,
    reducers: {
        setCurrentOrder(state, action: PayloadAction<BillingOrder>) {
            state.currentOrder = action.payload;
            state.totalItems = action.payload.totalQuantity;
        },
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

export const { setCurrentOrder, setLocalMenu, changeMenuByLanguage } = bristoConfigSlice.actions;

export default bristoConfigSlice.reducer;
