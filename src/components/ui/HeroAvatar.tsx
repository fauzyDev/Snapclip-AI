"use client"

import React from "react";
import { Avatar, type AvatarProps } from "@heroui/react";

type Props = AvatarProps;

export default function HeroAvatar(props: Props) {
  return (
    <Avatar {...props}/>
  )
}

