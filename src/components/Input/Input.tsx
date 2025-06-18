"use client"

import React from 'react';
import { Textarea } from "@heroui/react";
import { Button } from '@heroui/react';

type InputProps = {
    onSubmit: (input: string) => void;
};

const Input = ({ onSubmit }: InputProps) => {
    const [input, setInput] = React.useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === "") return;
        onSubmit(input)
        setInput("")
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
            <Textarea
                value={input}
                variant="faded"
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-xl text-base text-white bg-neutral-700"
                placeholder="Ask me anything..."
            />
            <Button type="submit" size="sm" color="primary" radius="full" className="absolute bottom-2 right-2 hover:bg-blue-500 transition-all cursor-pointer focus:outline-none">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Z" />
                </svg>
            </Button>
            </form>
        </div>
    );
}

export default Input;