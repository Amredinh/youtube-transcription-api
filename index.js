export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Example: /?videoId=YOUTUBE_ID
    const videoId = url.searchParams.get("videoId") || "none";

    // Return JSON
    return new Response(JSON.stringify({
      status: "success",
      videoId: videoId,
      transcription: "This is a demo transcription."
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
