let Parser = require('rss-parser');
let parser = new Parser();

exports.getArticles = async (req, res) => {    
  try {
    let category
    if (req.body.preferences) {
      category = `actualites/category/${req.preferences}`
    } else {
      category = 'actualites'
    }
    const feedUrl = `https://coinjournal.net/fr/${category}/feed/`;

    
    const feed = await parser.parseURL(feedUrl);

    // Extract the relevant information from the feed
    const feedInfo = {
      title: feed.title,
      description: feed.description,
      link: feed.link,
      items: feed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.contentSnippet, 
        categories: item.categories,
      })),
    };

    res.json(feedInfo);
    // console.log(feedInfo);
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
