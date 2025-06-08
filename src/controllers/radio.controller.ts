import { Request, Response } from "express";
import fs from "fs";
import { spawn } from "child_process";
import RadioService from "../services/radio.service";

// import RadioService from "../services/radio.service";

class RadioController {
  //   async getRadioStation(req: Request, res: Response) {
  //     const { station } = req.params;
  //   }

  clients: any[] = [];

  async playRadio(req: Request, res: Response) {
    res.set({
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
      Connection: "keep-alive",
    });

    RadioService.addClient(res);
    console.log(`Client connected: ${RadioService.clients.length} total`);

    req.on("close", () => {
      RadioService.removeClient(res);
      console.log(`Client disconnected: ${RadioService.clients.length} left`);
    });
  }
}

export default new RadioController();
