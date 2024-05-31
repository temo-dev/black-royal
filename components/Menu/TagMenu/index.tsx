import { Carousel } from '@mantine/carousel';
import { Button, rem } from '@mantine/core';
import { IconBoxMargin } from '@tabler/icons-react';
import React from 'react';

const TagMenu = () => {
    return (
        <div className="my-5">
            <Carousel slideSize="auto" slideGap={{ base: 10, sm: 'md' }} loop align="start" withIndicators={false} withControls={false} dragFree>
                <Carousel.Slide>
                    <Button
                        variant="outline"
                        radius="md"
                        color="black"
                        className="text-md font-bold hover:bg-white hover:text-orange-300"
                        size="sm"
                        leftSection={<IconBoxMargin style={{ width: rem(20), height: rem(20) }} />}
                    >
                        VSE
                    </Button>
                </Carousel.Slide>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Carousel.Slide key={i}>
                        <Button variant="outline" radius="md" color="black" className="text-md font-bold hover:bg-white hover:text-orange-300" size="sm">
                            Sub Menu
                        </Button>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default TagMenu;
