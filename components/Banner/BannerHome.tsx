import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, rem } from '@mantine/core';
import classes from './Banner.module.css';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
const BannerHome = () => {
    return (
        <div>
            <h1 className="mb-2 text-3xl font-black">AKČNÍ NABÍDKA</h1>
            <Carousel
                classNames={classes}
                withIndicators={true}
                height={200}
                slideSize={{ base: '100%', sm: '50%', md: '33.333333%', xl: '20%' }}
                slideGap={{ base: 0, sm: 'md' }}
                loop
                align="center"
                slidesToScroll={1}
                initialSlide={2}
                nextControlIcon={<IconArrowRight style={{ width: rem(30), height: rem(30) }} />}
                previousControlIcon={<IconArrowLeft style={{ width: rem(30), height: rem(30) }} />}
            >
                {[1, 2, 3, 4, 5].map((i) => (
                    <Carousel.Slide key={i}>
                        <Image radius="md" src={`https://sawepecomcdn.blob.core.windows.net/kfc-web-ordering/CZ/KFC/2024/w3/bannery/PizzaTwisters_Action_368x196_Ver2%20(1).png`} alt="blackroyal" h={200} w={370} fallbackSrc="/favicon.png" />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default BannerHome;
