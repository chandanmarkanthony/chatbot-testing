// public/chatbot.js
(function () {
  try {
    // Your backend URL
    var BACKEND = "https://chatbot-testing-roan.vercel.app";

    var micrositeUrl = window.location.href;
    var pathParts = window.location.pathname.split("/").filter(Boolean);
    var projectName = pathParts.length ? pathParts[pathParts.length - 1] : "";

    // Floating chat button
    var chatBtn = document.createElement("div");
    chatBtn.id = "my_chat_btn";
    chatBtn.style.position = "fixed";
    chatBtn.style.bottom = "20px";
    chatBtn.style.right = "20px";
    chatBtn.style.width = "60px";
    chatBtn.style.height = "60px";
    chatBtn.style.borderRadius = "50%";
    chatBtn.style.background = "#007bff";
    chatBtn.style.color = "white";
    chatBtn.style.display = "flex";
    chatBtn.style.justifyContent = "center";
    chatBtn.style.alignItems = "center";
    chatBtn.style.cursor = "pointer";
    chatBtn.style.zIndex = "9999999";
    chatBtn.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
    chatBtn.innerHTML = '<span style="font-size:24px;">💬</span>';
    document.body.appendChild(chatBtn);

    var iframe;

    async function initFrame() {
      let meta = { title: "", description: "" };

      try {
        const res = await fetch(BACKEND + "/api/get-meta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: micrositeUrl })
        });
        meta = await res.json();
      } catch (e) {
        console.warn("META fetch failed", e);
      }

      const q = new URLSearchParams({
        project: projectName,
        title: encodeURIComponent(meta.title || ""),
        description: encodeURIComponent(meta.description || "")
      }).toString();

      iframe = document.createElement("iframe");
      iframe.src = BACKEND + "/chat?" + q;
      iframe.style.position = "fixed";
      iframe.style.bottom = "90px";
      iframe.style.right = "20px";
      iframe.style.width = "360px";
      iframe.style.height = "520px";
      iframe.style.border = "none";
      iframe.style.borderRadius = "10px";
      iframe.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
      iframe.style.zIndex = "9999999";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    chatBtn.addEventListener("click", async function () {
      if (!iframe) await initFrame();
      iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    });

  } catch (err) {
    console.error("chatbot.js error:", err);
  }
})();
