import React from 'react';
import classes from './Thankyou.module.css';
import { Button, Card, Overlay, Text } from '@mantine/core';
import { BillingOrder } from '../../../types/bristo';

interface ThannkyouProps {
    clientOrder: BillingOrder | null;
}
const Thankyou = (props: ThannkyouProps) => {
    const { clientOrder } = props;
    return (
        <>
            <h1 className="font-bold">{`Please Save Pictrue and Show it to Nika Staff`}</h1>
            <Card radius="md" className={classes.card}></Card>
            <h1 className="font-bold">{`Your order: ${clientOrder?.id}`}</h1>
            <h1 className="font-bold">{`Your Bill: ${clientOrder?.total} kc`}</h1>
            <h1 className="font-bold">{`locale: Nika Coffee and Tea`}</h1>
        </>
    );
};

export default Thankyou;
