'use client';

import React from "react";
import { Textarea, type TextAreaProps } from "@heroui/input";

type Props = TextAreaProps;

export default function HeroTextarea(props: Props) {
  return (
    <Textarea {...props} />
  )
}