import { Schema, model } from "mongoose";

export interface ISong {
  name: string;
  artist: string;
  album: string;
  duration: number;
  path: string;
  thumbnail: string;
}

const songSchema = new Schema<ISong>({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

export default model("Song", songSchema);
