import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Channel } from '@/types/channel';

/**
 * Zustand store untuk mengelola daftar channel YouTube yang sedang aktif.
 *
 * @typedef {Object} ChannelStore
 * @property {Channel[]} channels - Daftar channel yang tersimpan di state.
 * @property {boolean} isSubmitted - Status apakah channel sudah disubmit oleh user.
 * @property {(ch: Channel[]) => void} setChannels - Menyetel daftar channel baru dan menandai sudah disubmit.
 * @property {() => void} resetChannels - Mereset state channel ke kondisi awal.
 *
 * @example
 * // Menambahkan channel baru
 * useChannelStore.getState().setChannels([{ id: 'abc', name: 'Timothy Ronald' }]);
 *
 * // Mereset store
 * useChannelStore.getState().resetChannels();
 */

type ChannelStore = {
    channels: Channel[];
    isSubmitted: boolean;
    setChannels: (ch: Channel[]) => void;
    resetChannels: () => void;
}

/**
 * Zustand store untuk menyimpan dan memulihkan state channel.
 * 
 * Menggunakan middleware `persist` untuk menyimpan state di localStorage
 * dengan key `channel-storage`, sehingga data tetap ada setelah refresh.
 */

export const useChannelStore = create<ChannelStore>()(persist(
    (set) => ({
        channels: [],
        isSubmitted: false,

        /**
      * Menyetel daftar channel baru.
      * @param {Channel[]} ch - Array daftar channel yang akan disimpan.
      */
        setChannels: (ch) => set({ channels: ch, isSubmitted: true }),

        /**
       * Menghapus semua channel dan mengembalikan ke state awal.
       */
        resetChannels: () => set({ channels: [], isSubmitted: false })
    }),
    { name: 'channel-storage' }
))