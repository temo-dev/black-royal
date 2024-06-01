import React, { useEffect, useState } from 'react';
import MenuCard from '../MenuCard';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import classes from './ListMenu.module.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { MenuTypes } from '../../../types/bristo';

const ListMenu = () => {
    const bristoConfig = useSelector((state: IRootState) => state.bristoConfig);
    const [menu, setMenu] = useState<MenuTypes[]>([]);
    useEffect(() => {
        setMenu(bristoConfig.localMenus);
    }, [bristoConfig.localMenus]);

    return (
        <div className="mt-10 max-w-[100vw] bg-slate-50">
            <Carousel
                withIndicators={true}
                classNames={classes}
                slideSize={{ base: '40%', xs: '20%', sm: '20%', md: '15%', lg: '15%', xl: '10%' }}
                slideGap={{ base: 0, sm: 'md' }}
                loop
                dragFree
                align="start"
                initialSlide={1}
                nextControlIcon={<IconArrowRight style={{ width: rem(30), height: rem(30) }} />}
                previousControlIcon={<IconArrowLeft style={{ width: rem(30), height: rem(30) }} />}
            >
                {menu.map((menu) => (
                    <Carousel.Slide key={menu.id}>
                        <MenuCard menu={menu} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default ListMenu;
