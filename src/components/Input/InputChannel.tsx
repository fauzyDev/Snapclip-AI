'use client';

import React from "react";
import { Form, Input, Button } from "@heroui/react";

type Channel = { id: string; name: string }

export default function InputChannel() {
  const [action, setAction] = React.useState<Channel[]>([
    { id: '', name: '' },
    { id: '', name: '' }
  ]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/channels')
      const data = await response.json()
      if (data.Success?.length) {
        setAction(data.Success.map((ch: any) => ({
          id: ch.channel_id,
          name: ch.channel_name
        })))
        setIsSubmitted(true)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const ch1_id = formData.get('channel_id_1') as string
    const ch2_id = formData.get('channel_id_2') as string
    const ch1_name = formData.get('channel_name_1') as string
    const ch2_name = formData.get('channel_name_2') as string

    const payload = [
      { id: ch1_id, name: ch1_name },
      { id: ch2_id, name: ch2_name }
    ]

    const response = await fetch('/api/v1/channels/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ channels: payload })
    })

    const resData = await response.json();
    console.log('Server response:', resData);

    if (response) {
      setAction(payload);
      setIsSubmitted(true);
    } else {
      alert('Gagal simpan channel.');
    }
  }

  const handleReset = () => {
    setAction([]);
    setIsSubmitted(false); // reset form state
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={handleReset}
        onSubmit={handleSubmit}>

        {action.length > 0 && isSubmitted ? (action.map((ch, index) => (
          <div key={index}>
            <Input
              isReadOnly
              label={`Channel ${index + 1} - ID`}
              labelPlacement="outside"
              value={ch.id}
              type="text"
            />

            <Input
              isReadOnly
              label={`Channel ${index + 1} - Name`}
              labelPlacement="outside"
              value={ch.name}
              type="text"
            />
          </div>
        ))) : (
          <>
            <Input
              isRequired
              errorMessage="Please enter a valid ID"
              label="Channel 1 - ID"
              labelPlacement="outside"
              name="channel_id_1"
              placeholder="Enter your ID Channel 1"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Please enter a valid Name"
              label="Channel 1 - Name"
              labelPlacement="outside"
              name="channel_name_1"
              placeholder="Enter your Name Channel 1"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Please enter a ID"
              label="Channel 2 - ID"
              labelPlacement="outside"
              name="channel_id_2"
              placeholder="Enter your Name Channel 2"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Please enter a valid Name"
              label="Channel 2 - Name"
              labelPlacement="outside"
              name="channel_name_2"
              placeholder="Enter your Name Channel"
              type="text"
            />
          </>
        )}

        <div className="flex gap-2">
          {action.length === 0 && !isSubmitted && (
            <Button color="primary" type="submit" variant="solid">
              Submit
            </Button>
          )}
          <Button color="danger" type="reset" variant="solid">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}