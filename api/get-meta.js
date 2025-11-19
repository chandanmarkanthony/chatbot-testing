// api/get-meta.js
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  // Allow CORS from anywhere (microsite will fetch this)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { url } = req.body || req.query;
    if (!url) return res.status(400).json({ error: "Missing url" });

    const { data: html } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(html);

    const title =
      $("title").text().trim() ||
      $("meta[property='og:title']").attr("content") ||
      $("meta[name='title']").attr("content") ||
      "";

    const description =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      "";

    const image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='twitter:image']").attr("content") ||
      "";

    const canonical = $("link[rel='canonical']").attr("href") || url;

    res.json({ title, description, image, canonical });
  } catch (err) {
    console.error("get-meta error:", err.message);
    res.status(500).json({ error: "Failed to fetch meta", detail: err.message });
  }
};
