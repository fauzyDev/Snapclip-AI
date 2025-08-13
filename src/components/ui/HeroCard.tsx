'use client';

import React from 'react';
import { Card, type CardProps } from "@heroui/card";

type Props = CardProps & {
    children: React.ReactNode
}

export default function HeroCard(props: Props) {
    return (
        <Card {...props}>{props.children}</Card>
    )
}
