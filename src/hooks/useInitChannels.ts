import React from "react";
import { useChannelStore } from '@/store/useChannelStore';
import { Channel } from "@/types/channel";

export default function useInitChannels() {
  const { channels, setChannels } = useChannelStore();

  React.useEffect(() => {
    const fetchData = async () => {
      if (channels.length > 0) {
        return;
      }

      const response = await fetch('/api/v1/channels')
      const data = await response.json()
      if (data.Success?.length) {
        setChannels(data.Success.map((ch: Channel) => ({
          id: ch.id,
          name: ch.name
        })))
      }
    }
    fetchData();

  }, [channels, setChannels]);
}