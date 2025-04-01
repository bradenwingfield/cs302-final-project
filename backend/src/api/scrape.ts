const axios = require('axios');
const cheerio = require('cheerio');

//keep track of visitedUrls
const visitedUrls = new Set<string>();

//Base URL 
const baseUrl = 'https://casetext.com/statute/tennessee-code'

//Delay to not overwhelm server
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Recursive function to scrape the website
async function scrapePage(url: string): Promise<void> {
  if (visitedUrls.has(url)) return; // Avoid revisiting
  visitedUrls.add(url);
  await delay(1000);

  try {
    console.log(`Scraping: ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract the title and content
    const title = $('span.title').text().trim();
    const text = $('section')
    console.log(`Title: ${title || 'No Title Found'}`);
    console.log(text)

    // Find and follow internal links
    const links = $('a.item-content[href]');
    if (links.length === 0) {
      console.log(`No more links on ${url}. Section complete.`);
      return;
    }

    links.each(async (_: any, element: any) => {
      const link = $(element).attr('href');
      console.log(`Found link: ${link}`);
      if (link && link.startsWith('statute/tennessee-code/')) {
        try {
          const fullUrl = new URL(link, baseUrl).href;
          console.log(`Following link: ${fullUrl}`);
          await scrapePage(fullUrl); // Recursive call
        } catch (e) {
          console.error(`Invalid URL: ${link}`, e);
        }
      }
    });

  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }
}

// Start scraping from the base URL
scrapePage(baseUrl);