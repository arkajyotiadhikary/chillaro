// Models
import Radio from "../models/Radio";
import Song, { ISong } from "../models/Song";
import Playlist, { IPlaylist } from "../models/Playlist";

import { spawn } from "child_process";
import { Response } from "express";

class RadioService {
  currentIndex = 0;
  clients: any[] = [];
  currentFFmpeg: any;
  playlist: string[];

  constructor(playlist: string[]) {
    this.playlist = playlist;
    this.currentIndex = 0;
    this.clients = [];
    this.currentFFmpeg = null;
  }

  start() {
    this.playNextSong();
  }

  // NOTE: in future we will have multiple radio feature where admin can add or remove songs from the radio
  async getRadio() {
    const radio = await Radio.find();
    return radio;
  }

  async addSongToRadio({
    name,
    artist,
    album,
    duration,
    path,
    thumbnail,
  }: ISong) {
    const song = await Song.create({
      name,
      artist,
      album,
      duration,
      path,
      thumbnail,
    });
    return song;
  }

  async addPlaylistToRadio({
    name,
    description,
    thumbnail,
    songs,
    radioId,
  }: IPlaylist) {
    const playlist = await Playlist.create({
      name,
      description,
      thumbnail,
      songs,
      radioId,
    });
    return playlist;
  }

  async getPlaylists(radioId: string) {
    const playlists = await Playlist.find({ radioId });
    return playlists;
  }

  async addSongToPlaylist(playlistId: string, songId: string) {
    const playlist = await Playlist.findByIdAndUpdate(playlistId, {
      $push: { songs: songId },
      new: true,
    });
    return playlist;
  }

  async removeSongFromPlaylist(playlistId: string, songId: string) {
    const playlist = await Playlist.findByIdAndUpdate(playlistId, {
      $pull: { songs: songId },
      new: true,
    });
    return playlist;
  }

  async removeSongFromRadio(id: string) {
    const song = await Song.findByIdAndDelete(id);
    return song;
  }

  async removePlaylistFromRadio(id: string) {
    const playlist = await Playlist.findByIdAndDelete(id);
    return playlist;
  }

  async playPlaylist(playlistId: string) {
    const playlist = await Playlist.findById(playlistId);
    this.playlist = playlist?.songs.map((song) => song.toString()) || [];
    this.playNextSong();
  }

  playNextSong() {
    const file = this.playlist[this.currentIndex];
    console.log(`Streaming: ${file}`);

    const ffmpeg = spawn("ffmpeg", [
      "-re",
      "-i",
      file,
      "-f",
      "mp3",
      "-content_type",
      "audio/mpeg",
      "pipe:1",
    ]);

    ffmpeg.stdout.on("data", (chunk) => {
      this.clients.forEach((res) => res.write(chunk));
    });

    ffmpeg.stderr.on("data", () => {});

    ffmpeg.on("close", () => {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
      this.playNextSong();
    });

    ffmpeg.on("error", (err) => {
      console.error("FFmpeg error:", err);
    });

    this.currentFFmpeg = ffmpeg;
  }
  addClient(res: Response) {
    this.clients.push(res);
    console.log(`Client connected: ${this.clients.length} total`);
  }

  removeClient(res: Response) {
    this.clients = this.clients.filter((client) => client !== res);
    console.log(`Client disconnected: ${this.clients.length} left`);
  }
}

export default new RadioService(["songs/traps/gunna1.mp3"]);
