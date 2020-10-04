import express from "express";

import { Store as StoreRedis } from "../store/store_redis";

const router = express.Router();
const store = new StoreRedis();

router.post("/url", async (req, res) => {
  const { url } = req.body;
  if (isUrlValid(url)) {
    try {
      const shortUrl = await store.put(url);
      res.status(200).json({
        success: true,
        shortUrl: `${process.env.FE_HOST}/${shortUrl}`,
        longUrl: url,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: "error occured" });
    }
  } else {
    res.status(500).json({ success: false, msg: "invalid url" });
  }
});

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await store.get(shortUrl);
    if (url !== null) {
      res.redirect(url);
      return;
    }
    res.redirect(`${process.env.FE_HOST}/error`);
  } catch (err) {
    res.redirect(`${process.env.FE_HOST}/error`);
  }
});

function isUrlValid(url: string): boolean {
  return (
    !!url &&
    url.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    ) !== null
  );
}

export default router;
