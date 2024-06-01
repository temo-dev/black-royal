import { Card, Grid, Image } from '@mantine/core';

import React from 'react';
import { FoodTypes } from '../../../types/bristo';

interface ItemCardProps {
    food: FoodTypes;
}
const ItemCard = (props: ItemCardProps) => {
    const { food } = props;
    return (
        <Card shadow="sm" component="a" style={{ width: '351px', height: '160px' }} radius="md" padding="md" className="cursor-pointer">
            <Grid justify="start" align="flex-start" gutter="lg">
                <Grid.Col span={4}>
                    <Card.Section>
                        <Image src={food.image} w={126} h={160} alt="black-royal" />
                    </Card.Section>
                </Grid.Col>
                <Grid.Col span={7} offset={1}>
                    <div className="flex h-[130px] flex-col justify-between">
                        <h1 className="line-clamp-1 text-lg font-bold capitalize">{food.name_food}</h1>
                        <p className="line-clamp-2 text-gray-500">Made by Nika Coffee and Tea</p>
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">od</p>
                            <p className="text-lg font-bold">{`${food.price} kc`}</p>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default ItemCard;
