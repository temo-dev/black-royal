import React from 'react';
import MenuCard from '../MenuCard';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import classes from './ListMenu.module.css';
const ListMenu = () => {
    return (
        <div className="mt-10 max-w-[100vw] bg-slate-50">
            <Carousel
                withIndicators={true}
                classNames={classes}
                slideSize={{ base: '40%', xs: '20%', sm: '20%', md: '15%', lg: '15%', xl: '10%' }}
                slideGap={{ base: 0, sm: 'md' }}
                loop
                dragFree
                align="center"
                initialSlide={3}
                nextControlIcon={<IconArrowRight style={{ width: rem(30), height: rem(30) }} />}
                previousControlIcon={<IconArrowLeft style={{ width: rem(30), height: rem(30) }} />}
            >
                {[1, 2, 3, 4, , 6, 7, 8, 9].map((i) => (
                    <Carousel.Slide key={i}>
                        <MenuCard />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default ListMenu;
