export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY;
  const { query } = req.query; // get query string like 'India'

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("NewsAPI fetch error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}