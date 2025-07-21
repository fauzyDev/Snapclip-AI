'use client';

import React from "react";
import { Form, Input, Button } from "@heroui/react";

type Channel = { id: string; name: string }

export default function InputChannel() {
  const [action, setAction] = React.useState<Channel[]>([
    { id: '', name: '' },
    { id: '', name: '' }
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/channels')
      const data = await response.json()
      if (data.channels?.length) {
        setAction(data.channels.map((ch: any) => ({
          id: ch.channel_id,
          name: ch.channel_name
        })))
      }  
    }
    fetchData();
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={() => setAction([])}
        onSubmit={ }
      >
        <Input
          isRequired
          errorMessage="Please enter a valid ID"
          label="Channel 1"
          labelPlacement="outside"
          value={action}
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
    </div>
  );
}
