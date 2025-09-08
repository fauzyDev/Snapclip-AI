import React from "react";
import { useChannelStore } from '@/store/useChannelStore';
import { SupabaseChannel } from "@/types/supabaseChannel";

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
        setChannels(data.Success.map((ch: SupabaseChannel) => ({
          id: ch.channel_id,
          name: ch.channel_name
        })))
      }
    }
    fetchData();

  }, [channels, setChannels]);
}