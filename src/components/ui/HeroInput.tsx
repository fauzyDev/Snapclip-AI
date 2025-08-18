'use client';

import React from "react";
import { Input, type InputProps } from "@heroui/input";

type Props = InputProps;

export default function HeroInput(props: Props) {
  return (
    <Input {...props} />
  )
}