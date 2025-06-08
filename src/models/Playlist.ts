import { Schema, model, Types } from "mongoose";

export interface IPlaylist {
  name: string;
  radioId: Types.ObjectId;
  description: string;
  thumbnail: string;
  songs: Types.ObjectId[];
}

const playlistSchema = new Schema<IPlaylist>({
  name: { type: String, required: true },
  radioId: { type: Schema.Types.ObjectId, ref: "Radio", required: true },
  description: { type: String, required: false },
  thumbnail: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song", required: true }],
});

export default model("Playlist", playlistSchema);
