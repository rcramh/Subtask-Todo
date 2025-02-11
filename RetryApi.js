
function fetchData() {
  return new Error("API request failed due to an internal error.");
}

const retryIntervals = [2, 4, 8, 16];

async function attemptApiCall(attempt = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Retrying API - Attempt ${attempt + 1}...`);

      const result = fetchData();

      if (result instanceof Error && attempt < retryIntervals.length - 1) {
        resolve(attemptApiCall(attempt + 1));
      } else {
        resolve(result);
      }
    }, retryIntervals[attempt] * 1000);
  });
}

app.get("/api/somepath", async (req, res) => {
  try {
    const result = await attemptApiCall();

    if (result instanceof Error) {
      return res.status(500).json({ success: false, error: result.message });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: "Unexpected server error" });
  }
});
