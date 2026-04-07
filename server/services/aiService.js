import openai from "../config/openai.js";

export const analyzeResume = async (resumeText, jobDesc) => {
  try {
    const prompt = `
You are an ATS (Applicant Tracking System) expert.

Analyze the following resume based on the job description.

Return response in JSON format with:
- score (0-100)
- summary
- strengths (array)
- weaknesses (array)
- suggestions (array)
- missingKeywords (array)

Resume:
${resumeText}

Job Description:
${jobDesc}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      message: [
        {
          role: "system",
          content: "you are a professional resume analyzer",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    // 🔥 convert string → JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      result = { raw: content };
    }

    return result;
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    throw new Error("AI analysis failed");
  }
};
