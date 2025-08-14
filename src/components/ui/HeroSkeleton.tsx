'use client';

import React from 'react';
import { Skeleton, type SkeletonProps } from "@heroui/skeleton";

type Props = SkeletonProps;

export default function HeroSkeleton(props: Props) {
    return (
        <Skeleton {...props}/>
    )
}