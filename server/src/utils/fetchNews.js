import axios from 'axios';

// Fetch news from multiple sources using a topic query
// This function returns a simplified list of news articles

export async function fetchNewsByTopic(topics = []) {
    const query = topics.length ? topics.join(' OR ') : 'technology';

    // 1. Fetch news from NewsAPI
    let newsAPIArticles = [];
    try {

        /**
        * Fetch news articles from NewsAPI.
        * - Uses query "q" to search topics
        * - Requests English articles
        * - Sorts by most recent
        * - Limits to 20 results
        * - Uses API key from environment variables
        */

        const newsAPIResponse = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 20,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        /**
        * Convert raw NewsAPI articles into a simplified format.
        * - Safe fallback to [] if no articles
        * - Maps only the needed fields
        */

        newsAPIArticles = (newsAPIResponse.data.articles || []).map(a => ({
            title: a.title,
            url: a.url,
            image: a.urlToImage,
            source: a.source?.name,
            content: a.description || a.content,
            publishedAt: a.publishedAt
        }));

    } catch (error) {
        console.warn('Error fetching from NewsAPI:', error.message);
    }

    // 2. Fetch news from GNews
    let gNewsArticles = [];
    try {
        
        const gNewsResponse = await axios.get('https://gnews.io/api/v4/search', {
            params: {
                q: query,
                lang: 'en',
                max: 20,
                token: process.env.GNEWS_API_KEY
            }
        });

        // Simplify and map the results
        gNewsArticles = (gNewsResponse.data.articles || []).map(a => ({
            title: a.title,
            url: a.url,
            image: a.image,
            source: a.source?.name,
            content: a.description || a.content,
            publishedAt: a.publishedAt
        }));
        
    } catch (error) {
        console.warn('Error fetching from GNews:', error.message);
    }

    // Combine and sort articles by published date + duplicate by URL
    const combinedArticles = [...newsAPIArticles, ...gNewsArticles];
    const uniqueArticlesMap = Array.from(
        new Map(combinedArticles.map(item => [item.url, item])).values()
    );

    return uniqueArticlesMap;
}