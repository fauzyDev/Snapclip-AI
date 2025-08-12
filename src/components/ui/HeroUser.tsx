'use client';

import React from "react";
import { User, type UserProps } from "@heroui/user";

type Props = UserProps;

export default function HeroUser(props: Props) {
  return (
    <User {...props} />
  )
}