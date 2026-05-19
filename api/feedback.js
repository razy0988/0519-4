export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Only POST is allowed" });
  }

  try {
    const apiKey = process.env.AI_KEY;

    if (!apiKey) {
      return res.status(200).json({
        ok: false,
        feedback: "尚未設定 AI_KEY，因此目前只顯示本機學習摘要。"
      });
    }

    const body = req.body || {};
    const history = Array.isArray(body.history) ? body.history : [];

    const prompt = `
你是國小低年級數學老師。請根據以下乘法遊戲紀錄，產生一段簡短、鼓勵、具體的學習建議。
請使用繁體中文，語氣適合國小低年級學生，最多 120 字。

學生資料：
${JSON.stringify(body.student || {})}

分數：
玩家 ${body.playerScore ?? 0} 分，AI ${body.computerScore ?? 0} 分。

作答紀錄：
${JSON.stringify(history)}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vercel.com",
        "X-Title": "AI Tug of War Math Game"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: "你是親切的國小數學學習教練。" },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const feedback = data?.choices?.[0]?.message?.content?.trim() || "這次有完成挑戰，很棒！可以多練習答錯或來不及的題目。";

    return res.status(200).json({
      ok: true,
      feedback
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      feedback: "AI 建議暫時無法產生，但你的遊戲紀錄仍可保存。",
      error: error.message || String(error)
    });
  }
}