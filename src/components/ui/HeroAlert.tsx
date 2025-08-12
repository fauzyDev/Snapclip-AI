'use client';

import React from "react";
import { Alert, type AlertProps } from "@heroui/alert";

type Props = AlertProps;

export default function HeroAlert(props: Props) {
  return (
    <Alert {...props}/>
  )
}