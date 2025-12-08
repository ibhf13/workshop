function analyzeText(paragraph, topN = 5) {
  if (!paragraph || typeof paragraph !== 'string') return { totalWords: 0, uniqueWords: 0, averageWordLength: 0, topWords: [] };

  // 1. Normalize text and remove punctuation
  const cleaned = paragraph.toLowerCase().replace(/[^\w\s]/g, ' ');

  // 2. Split into words
  const words = cleaned.trim().split(/\s+/).filter(Boolean);

  const totalWords = words.length;
  let totalLength = 0;
  const freq = {};

  // 3. Count words & total length
  for (const w of words) {
    totalLength += w.length;
    freq[w] = (freq[w] || 0) + 1;
  }

  const uniqueWords = Object.keys(freq).length;
  const averageWordLength = totalWords ? Number((totalLength / totalWords).toFixed(2)) : 0;

  // 4. Get top N words
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));

  return {
    totalWords,
    uniqueWords,
    averageWordLength,
    topWords
  };
}

module.exports = analyzeText;
