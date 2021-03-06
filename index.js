const fastXmlParser = require('fast-xml-parser');
const axios = require('axios');

const leftPad = require('left-pad');

const seasonRegEx = /(\d)[stndrh]{2} season/gi;

const episodeRegEx = /[ _]-[ _](\d{2,3})(?:v\d)?[ _][\(\[-]/;
const batchRegEx = /[^h\d]\d{2,3}-(\d{2,3})[^p\d]/;

const headers = {
	'User-Agent': 'Nyaa-Available https://github.com/Vija02/nyaa-available',
}

function modifyTitle(title) {
  // Replace season
  const match = seasonRegEx.exec(title);
  if(match) {
    title = title.replace(seasonRegEx, `S${match[1]}`)
  }

  title = title.replace(/[^[:alnum:]!']/gi, ' ');
	title = title.replace(/ \(?TV\)?/g, '');
	title = title.replace(/  /g, ' ');
	title = title.trim();
	return title;
}
exports.modifyTitle = modifyTitle;

function checkEpisode(title, episode){
  return new Promise((resolve, reject) => {
    // Make the title more search friendly
    title = modifyTitle(title);

    // Build the uri
    const episodeString = leftPad(episode, 2, 0);
    const nyaaSuffix = `&cats=1_37&filter=0&term=${title}+${episodeString}`;
    const reqUrl = `https://www.nyaa.si/?page=rss${nyaaSuffix}`;

    // Request nyaa.si with params
    axios.get(reqUrl, {
      headers: headers
  	}).then(rss => {
      // Parse the xml to json
      const json = fastXmlParser.parse(rss.data);
      // Check if there's any item
      if(Array.isArray(json.rss.channel.item)){
        json.rss.channel.item.forEach((item) => {
          // Find the episode from the title
          let match = episodeRegEx.exec(item.title);
          if(match){
            // If it's what we want
            if(parseInt(match[1]) === episode){
              resolve(true);
              return;
            }
          }
          // Check if it's batch
          match = batchRegEx.exec(item.title);
          if(match){
            if(parseInt(match[1]) === episode){
              resolve(true);
              return;
            }
          }
        });
        // If episode not found
        resolve(false);
      }
      // If no item, return false
      resolve(false);
  	}).catch(error => {
  		reject(error);
  	})
  });
}
exports.checkEpisode = checkEpisode;
