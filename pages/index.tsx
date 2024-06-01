import { Container } from '@mantine/core';
import BannerHome from '../components/Banner/BannerHome';
import ListMenu from '../components/Menu/ListMenu';
import MenuContainer from '../components/Menu/MenuContainer';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { MenuTypes } from '../types/bristo';

const Index = () => {
    const bristoConfig = useSelector((state: IRootState) => state.bristoConfig);
    const [listMenu, setListMenu] = useState<MenuTypes[]>([]);
    useEffect(() => {
        setListMenu(bristoConfig.localMenus);
    }, [bristoConfig.localMenus]);

    return (
        <Container fluid>
            <div className="flex flex-col items-center">
                <BannerHome />
                <ListMenu />
            </div>
            {listMenu.map((menu) => (
                <MenuContainer key={menu.id} menu={menu} />
            ))}{' '}
        </Container>
    );
};

export default Index;
