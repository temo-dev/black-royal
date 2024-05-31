import { Card, Grid, Image } from '@mantine/core';

import React from 'react';

const ItemCard = () => {
    return (
        <Card shadow="sm" component="a" style={{ width: '351px', height: '160px' }} radius="md" padding="md">
            <Grid justify="start" align="flex-start" gutter="lg">
                <Grid.Col span={4}>
                    <Card.Section>
                        <Image src="/assets/images/menu/ska20.webp" w={126} h={160} alt="black-royal" />
                    </Card.Section>
                </Grid.Col>
                <Grid.Col span={7} offset={1}>
                    <div className="flex h-[130px] flex-col justify-between">
                        <h1 className="line-clamp-1 text-sm font-bold">RÝŽE S BITES GRANDE SWEET CHILLI MENU</h1>
                        <p className="line-clamp-2 text-gray-500">Box obsahuje Twister Pepperoni, bramborové lupínky, 5 x Hot Wings a Coleslaw.</p>
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">od</p>
                            <p className="text-lg font-bold">289 kc</p>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default ItemCard;
