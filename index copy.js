// Ania Format YT
const PORT = process.env.PORT || 4000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const writeStream = fs.createWriteStream('Diabetes.csv');
// Write Headers
writeStream.write(`Title,URL \n`);
const app = express();
const url = 'https://www.theguardian.com/uk'

axios(url)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = []

    $('.fc-item__title', html).each(function() {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      articles.push({
        title,
        url
      });
      // Write Row To CSV
      writeStream.write(`${title}, ${url} \n`);
    });
    console.log(articles)
  }).catch(err => console.error(err));


app.listen(PORT, () => console.log('server running', PORT))