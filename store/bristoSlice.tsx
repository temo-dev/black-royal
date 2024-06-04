import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BillingOrder, MenuTypes, FoodOrderTypes } from '../types/bristo';

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
        resetCurrentOrder(state) {
            state.currentOrder = null;
            state.totalItems = 0;
        },
        setCurrentOrder(state, action: PayloadAction<FoodOrderTypes>) {
            if (state.currentOrder) {
                state.currentOrder.addFood(action.payload);
            } else {
                state.currentOrder = new BillingOrder(state.codeOrder, state.countNumberOrder);
                state.currentOrder.addFood(action.payload);
            }
            state.totalItems = state.totalItems + action.payload.quantity;
        },
        updateCurrentOrder(state, action: PayloadAction<BillingOrder>) {
            state.currentOrder = action.payload;
        },

        updateTotalitems(state, action: PayloadAction<{ code: string; number: number }>) {
            switch (action.payload.code) {
                case 'plus':
                    state.totalItems += action.payload.number;
                    break;
                case 'reduce':
                    state.totalItems -= action.payload.number;
                    break;
                default:
                    state.totalItems = state.totalItems;
                    break;
            }
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

export const { updateTotalitems, updateCurrentOrder, resetCurrentOrder, setCurrentOrder, setLocalMenu, changeMenuByLanguage } = bristoConfigSlice.actions;

export default bristoConfigSlice.reducer;
