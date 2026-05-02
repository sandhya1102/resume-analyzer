export const calculateScore = (text) => {
  let score = 0;

  if (text.includes("JavaScript")) score += 20;
  if (text.includes("React")) score += 20;
  if (text.includes("Node")) score += 20;
  if (text.length > 500) score += 20;
  if (text.includes("project")) score += 20;

  return score;
};

// 🔍 KEYWORDS
export const extractKeywords = (text) => {
  const skills = ["JavaScript", "React", "Node", "MongoDB", "CSS"];

  return skills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
};

// 💡 SUGGESTIONS
export const generateSuggestions = (text) => {
  const suggestions = [];

  if (!text.includes("React")) {
    suggestions.push("Add React projects");
  }

  if (!text.includes("Node")) {
    suggestions.push("Include backend experience");
  }

  if (text.length < 300) {
    suggestions.push("Resume content is too short");
  }

  return suggestions;
};