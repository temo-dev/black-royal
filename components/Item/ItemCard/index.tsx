/* eslint-disable react-hooks/exhaustive-deps */
import { ActionIcon, Card, Checkbox, Drawer, Grid, Group, Image, Stack, rem } from '@mantine/core';

import React, { useEffect, useState } from 'react';
import { BillingOrder, FoodOptionsTypes, FoodOrderTypes, FoodTypes } from '../../../types/bristo';
import { useDisclosure } from '@mantine/hooks';
import { IconHeartFilled, IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setCurrentOrder } from '../../../store/bristoSlice';

interface ItemCardProps {
    food: FoodTypes;
}

const dataOptions: FoodOptionsTypes[] = [
    {
        id: 1,
        option_name: '350ml',
        price_of_option: 0,
        type_of_option: 'size',
    },
    {
        id: 2,
        option_name: '500ml',
        price_of_option: 30,
        type_of_option: 'size',
    },
    {
        id: 3,
        option_name: '750ml',
        price_of_option: 50,
        type_of_option: 'size',
    },
    {
        id: 4,
        option_name: 'Boba brown sugar',
        price_of_option: 10,
        type_of_option: 'topping',
    },
    {
        id: 4,
        option_name: 'Boba white',
        price_of_option: 10,
        type_of_option: 'topping',
    },
];

const ItemCard = (props: ItemCardProps) => {
    const { food } = props;
    const dispatch = useDispatch();
    const bristoConfig = useSelector((state: IRootState) => state.bristoConfig);
    const [optionOpened, drawedOpption] = useDisclosure(false);
    const [currentOrder, setOrder] = useState<BillingOrder | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (bristoConfig.currentOrder) {
            setOrder(bristoConfig.currentOrder);
        }
    }, [bristoConfig.currentOrder]);

    const handleBillingOrder = () => {
        let currentFood: FoodOrderTypes = {
            food: food,
            quantity: quantity,
        };
        if (currentOrder !== null) {
            currentOrder?.addFood(currentFood);
            dispatch(setCurrentOrder(currentOrder));
        } else {
            let newOrder = new BillingOrder(bristoConfig.codeOrder, bristoConfig.countNumberOrder);
            newOrder.addFood(currentFood);
            dispatch(setCurrentOrder(newOrder));
        }
        drawedOpption.close();
    };

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
            <Drawer opened={optionOpened} onClose={drawedOpption.close} title={<h1 className=" text-lg font-bold capitalize">{food.name_food}</h1>}>
                <Stack justify="space-between" className="h-[calc(100vh_-_80px)]">
                    <div className="relative">
                        <Image src={food.image} h={200} alt="black-royal" radius="md" />
                        <ActionIcon variant="transparent" size="xl" aria-label="love-it" className="absolute right-0 top-0 text-slate-400  focus:text-orange-700" color="black">
                            <IconHeartFilled style={{ width: rem(30), height: rem(30) }} />
                        </ActionIcon>
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">Size</h1>
                            <div className="mt-3">
                                {dataOptions
                                    .filter((option) => option.type_of_option === 'size')
                                    .map((option) => (
                                        <Checkbox
                                            color="orange"
                                            iconColor="dark.8"
                                            size="md"
                                            label={option.option_name}
                                            key={option.id}
                                            disabled={option.option_name !== '500ml'}
                                            defaultChecked={option.option_name === '500ml'}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    <Group grow>
                        <div className="inline-flex">
                            <button
                                type="button"
                                className="flex items-center justify-center border border-r-0 border-orange-300 bg-orange-300 px-3 font-semibold text-white hover:bg-orange-700 ltr:rounded-l-md rtl:rounded-r-md"
                                onClick={() => setQuantity(quantity - 1)}
                            >
                                -
                            </button>
                            <input type="number" placeholder={`${quantity}`} className="form-input rounded-none text-center" min="0" max="25" readOnly value={quantity} />
                            <button
                                type="button"
                                className="flex items-center justify-center border border-l-0 border-orange-300 bg-orange-300 px-3 font-semibold text-white hover:bg-orange-700 ltr:rounded-r-md rtl:rounded-l-md"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button type="button" className="btn btn-warning border-orange-300 bg-orange-300 hover:bg-orange-700" onClick={handleBillingOrder}>
                            <span>Add Items</span> <IconSquareRoundedPlusFilled className="ml-2" />
                        </button>
                    </Group>
                </Stack>
            </Drawer>
        </div>
    );
};

export default ItemCard;
