/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { setLocalMenu } from './store/bristoSlice';

const fetchMenu = async () => {
    const res = await axios.get('https://cms-hakasu.onrender.com/api/get-all-menu');
    return res.data;
};

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { data, isLoading } = useQuery({ queryKey: ['menus'], queryFn: fetchMenu });

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
        // locale
        const locale = localStorage.getItem('i18nextLng') || themeConfig.locale;
        dispatch(toggleLocale(locale));
        i18n.changeLanguage(locale);
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    useEffect(() => {
        if (isLoading === false && data?.length > 0) {
            console.log('data-menu', data);
            dispatch(setLocalMenu(data));
        }
    }, [isLoading]);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {children}
        </div>
    );
}

export default App;
