import { ActionIcon, Button, Card, Checkbox, Container, Drawer, Grid, Group, Image, Stack, rem } from '@mantine/core';

import React from 'react';
import { FoodTypes } from '../../../types/bristo';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconHeartFilled, IconPhoto, IconSquareRoundedPlusFilled } from '@tabler/icons-react';

interface ItemCardProps {
    food: FoodTypes;
}
const ItemCard = (props: ItemCardProps) => {
    const { food } = props;
    const [optionOpened, drawedOpption] = useDisclosure(false);
    return (
        <div>
            <Card shadow="sm" component="a" style={{ width: '351px', height: '160px' }} radius="md" padding="md" className="cursor-pointer" onClick={drawedOpption.open}>
                <Grid justify="start" align="flex-start" gutter="lg">
                    <Grid.Col span={4}>
                        <Card.Section>
                            <Image src={food.image} w={126} h={160} alt="black-royal" />
                        </Card.Section>
                    </Grid.Col>
                    <Grid.Col span={7} offset={1}>
                        <div className="flex h-[130px] flex-col justify-between">
                            <div>
                                <h1 className="line-clamp-1 text-lg font-bold capitalize">{food.name_food}</h1>
                                <ActionIcon variant="transparent" size="xl" aria-label="love-it" className="absolute right-0 top-0 text-orange-300  focus:text-orange-700" color="black">
                                    <IconSquareRoundedPlusFilled style={{ width: rem(30), height: rem(30) }} />
                                </ActionIcon>
                            </div>
                            <p className="line-clamp-2 text-gray-500">Made by Nika Coffee and Tea</p>
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">od</p>
                                <p className="text-lg font-bold">{`${food.price} kc`}</p>
                            </div>
                        </div>
                    </Grid.Col>
                </Grid>
            </Card>
            <Drawer opened={optionOpened} onClose={drawedOpption.close} title={<h1 className="text-lg font-bold capitalize">{food.name_food}</h1>}>
                <Stack justify="space-between">
                    <div className="relative">
                        <Image src={food.image} h={200} alt="black-royal" radius="md" />
                        <ActionIcon variant="transparent" size="xl" aria-label="love-it" className="absolute right-0 top-0 text-slate-400  focus:text-orange-700" color="black">
                            <IconHeartFilled style={{ width: rem(30), height: rem(30) }} />
                        </ActionIcon>
                    </div>
                    <div className="mt-5">
                        <h1 className="text-2xl font-bold">Size</h1>
                        <div className="mt-3">
                            <Checkbox color="orange" iconColor="dark.8" size="md" label="350ml" />
                            <Checkbox color="orange" iconColor="dark.8" size="md" label="500ml" checked />
                            <Checkbox color="orange" iconColor="dark.8" size="md" label="700ml" />
                        </div>
                    </div>
                    <Group grow>
                        <div className="inline-flex">
                            <button
                                type="button"
                                className="flex items-center justify-center border border-r-0 border-orange-300 bg-orange-300 px-3 font-semibold text-white ltr:rounded-l-md rtl:rounded-r-md"
                            >
                                -
                            </button>
                            <input type="number" placeholder="1" className="form-input rounded-none text-center" min="0" max="25" readOnly />
                            <button
                                type="button"
                                className="flex items-center justify-center border border-l-0 border-orange-300 bg-orange-300 px-3 font-semibold text-white ltr:rounded-r-md rtl:rounded-l-md"
                            >
                                +
                            </button>
                        </div>
                        <button type="button" className="btn btn-warning border-orange-300 bg-orange-300">
                            <span>Add Items</span> <IconSquareRoundedPlusFilled className="ml-2" />
                        </button>
                    </Group>
                </Stack>
            </Drawer>
        </div>
    );
};

export default ItemCard;
