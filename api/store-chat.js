// api/store-chat.js
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const body = req.body || {};
    const now = new Date().toISOString();

    // Example: in production, insert into DB here.
    console.log("STORE-CHAT:", { time: now, ...body });

    res.json({ ok: true, storedAt: now });
  } catch (err) {
    console.error("store-chat error:", err);
    res.status(500).json({ error: "Failed to store chat" });
  }
};
