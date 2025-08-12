'use client';

import React from "react";
import { Button, type ButtonProps } from "@heroui/button";

type Props = ButtonProps & {
  children: React.ReactNode;
}

export default function HeroButton(props: Props) {
  return (
    <Button {...props}>{props.children}</Button>
  )
}