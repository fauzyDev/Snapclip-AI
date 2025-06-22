"use client"

import React from 'react'
import { User, type UserProps } from "@heroui/react";

type Props = UserProps;

export default function HeroUser(props: Props) {
  return (
    <User {...props} />
  )
}