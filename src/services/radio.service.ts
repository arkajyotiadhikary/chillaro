// // This sercie is related to all kind of radio related operations

// import Radio from "../models/radio.model";

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
