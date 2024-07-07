import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiuRL = import.meta.env.VITE_REACT_VITE_API_URL_TRACK;

interface Track {
  track: {
    id: string;
    name: string;
    album: {
      release_data: number;
      images: { url: string }[];
      release_date: string;
    };
    preview_url: string;
    artists: { name: string }[];
  };
}

interface AlbumState {
  data: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  data: [],
  loading: false,
  error: null,
};

// PlayList

export const fetchPlaylistData = createAsyncThunk("musicTrack", async () => {
  try {
    const response = await axios.get(`${apiuRL}`);
    return response.data.items;
  } catch (error) {
    throw new Error("Failed to fetch playlist data");
  }
});

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlaylistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "error";
      });
  },
});

export default musicSlice.reducer;
