'use client';

import React from "react";
import { InputOtp, type InputOtpProps } from "@heroui/input-otp";

type Props = InputOtpProps;

export default function HeroInputOtp(props: Props) {
  return (
    <InputOtp {...props} />
  )
}