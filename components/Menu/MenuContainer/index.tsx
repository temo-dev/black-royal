import { Button, Grid, rem } from '@mantine/core';
import React from 'react';
import ItemCard from '../../Item/ItemCard';
import classes from './MenuContainer.module.css';
import { IconArrowBarToDown } from '@tabler/icons-react';
import TagMenu from '../TagMenu';

const MenuContainer = () => {
    return (
        <div className="mt-10">
            <h1 className="text-2xl font-black  md:text-5xl">Sidane</h1>
            <TagMenu />
            <Grid justify="center" align="flex-start" gutter="md">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={i} style={{ maxWidth: '400px' }}>
                        <ItemCard />
                    </Grid.Col>
                ))}
            </Grid>
            <div className="mt-8 flex w-full items-center justify-center">
                <Button variant="light" color="gray" size="md" className={classes.button} rightSection={<IconArrowBarToDown style={{ width: rem(16), height: rem(16) }} />}>
                    Zobrazit více
                </Button>
            </div>
        </div>
    );
};

export default MenuContainer;
