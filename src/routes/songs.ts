import { Router } from "express";
import YTMusic from "ytmusic-api";

const router = Router();

router.get("/songs/:songname", async (req, res) => {
  const songname = req.params.songname;
  const ytMusic = new YTMusic();
  await ytMusic.initialize();
  const song = await ytMusic.search(songname);
  res.send(song);
});

export default router;
