'use client';

import React from 'react';
import { Skeleton, type SkeletonProps } from "@heroui/skeleton";

type Props = SkeletonProps & {
    children: React.ReactNode
}

export default function HeroSkeleton(props: Props) {
    return (
        <Skeleton {...props}>{props.children}</Skeleton>
    )
}