'use client';

import React from "react";
import { Form, Input, Button } from "@heroui/react";

export default function InputChannel() {
  const [action, setAction] = React.useState<string | null>(null);

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onReset={() => setAction("")}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid ID"
        label="Channel 1"
        labelPlacement="outside"
        name="ID Channel 1"
        placeholder="Enter your ID Channel"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a ID"
        label="Channel 2"
        labelPlacement="outside"
        name="ID Channel 2"
        placeholder="Enter your ID Channel"
        type="text"
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit" variant="solid">
          Submit
        </Button>
        <Button color="danger" type="reset" variant="solid">
          Reset
        </Button>
      </div>

      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
