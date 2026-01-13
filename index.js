export default {
  async fetch(request) {
    const url = new URL(request.url);
    const videoId = url.searchParams.get("videoId");

    if (!videoId) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Please provide a videoId"
      }), { headers: { "Content-Type": "application/json" } });
    }

    try {
      // Fetch YouTube automatic captions in XML format
      const res = await fetch(
        `https://video.google.com/timedtext?lang=en&v=${videoId}`
      );

      if (!res.ok) throw new Error("Captions not found");

      const xmlText = await res.text();

      // Simple XML to plain text conversion
      const plainText = xmlText
        .replace(/<text.+?>(.*?)<\/text>/g, (_, t) => t + " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      return new Response(JSON.stringify({
        status: "success",
        videoId: videoId,
        transcription: plainText.trim()
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({
        status: "error",
        message: err.message
      }), { headers: { "Content-Type": "application/json" } });
    }
  }
}
