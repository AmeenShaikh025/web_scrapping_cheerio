const PORT = process.env.PORT || 4000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const writeStream = fs.createWriteStream('Diabetes.csv');
// Write Headers
writeStream.write(`Symtoms(common), type-1, type-1-kids, type-2, type-2-kids, insipidus , insipidus-kids, male, female, female-pregnant, female-pregnant-causes, skin-irritation, skin-rash, skin-rash-general, ketoacidosis, foot-neuropathy, foot-neuropathy-foot-ulcers, coma, hyperglycemia, brittle, retinopathy \n`);
const app = express();
const url_1 = 'https://www.niddk.nih.gov/health-information/diabetes/overview/symptoms-causes#symptoms';
const url_2 = 'https://www.who.int/news-room/fact-sheets/detail/diabetes';
const url_3 = 'https://www.mayoclinic.org/diseases-conditions/diabetes/symptoms-causes/syc-20371444';
const url_4 = 'https://www.mayoclinic.org/diseases-conditions/type-2-diabetes/symptoms-causes/syc-20351193';
const url_5 = 'https://www.mayoclinic.org/diseases-conditions/diabetes-insipidus/symptoms-causes/syc-20351269';
const url_6 = 'https://my.clevelandclinic.org/health/diseases/7104-diabetes-mellitus-an-overview';
const url_7 = 'https://my.clevelandclinic.org/health/diseases/9012-gestational-diabetes';
const url_8 = 'https://my.clevelandclinic.org/health/articles/12176-diabetes-skin-conditions';
const url_9 = 'https://my.clevelandclinic.org/health/diseases/21945-diabetic-ketoacidosis-dka';
const url_10 = 'https://my.clevelandclinic.org/health/diseases/21510-diabetic-feet';
const url_11 = 'https://my.clevelandclinic.org/health/diseases/16628-diabetic-coma';
const url_12 = 'https://my.clevelandclinic.org/health/diseases/9815-hyperglycemia-high-blood-sugar';
const url_13 = 'https://my.clevelandclinic.org/health/diseases/21499-brittle-diabetes';
const url_14 = 'https://www.nhs.uk/conditions/diabetic-retinopathy/';
const url_15 = 'https://www.mayoclinic.org/diseases-conditions/type-1-diabetes-in-children/symptoms-causes/syc-20355306';
const url_16 = 'https://www.mayoclinic.org/diseases-conditions/type-2-diabetes-in-children/symptoms-causes/syc-20355318';

let symptoms = [];
let symp_diab1 = [];
let symp_diab1_kids = [];
let symp_diab2 = [];
let symp_diab2_kids = [];
let symp_insipidus = [];
let symp_insipidus_kids = [];
let symp_male = [];
let symp_female = [];
let symp_female_pregnant = [];
let symp_female_pregnant_causes = [];
let symp_skin_irritation  = [];
let symp_skin_rash = [];
let symp_skin_rash_general = [];
let symp_ketoacidosis = [];
let symp_foot_neuropathy = [];
let symp_foot_neuropathy_foot_ulcers = [];
let symp_coma = [];
let symp_hyperglycemia = []; 
let symp_brittle = []; 
let symp_retinopathy = []; 


// For array
function popAndShift(arr) {
  arr.pop();
  arr.shift();
  return arr;
}

// Common
axios(url_1)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    $('.health-detail-content ul:nth-of-type(2) li', html).each(function() {
      const symptom = $(this).text();
      symptoms.push(symptom);
    });
    let jsonContent = JSON.stringify({"Symptoms(common)": symptoms});
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
  }).catch(err => console.error(err));

// Type 1
axios(url_2)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data = $('.sf-detail-body-wrapper p:nth-of-type(9) span').text();
    let data_arr = data.split(",");
    data_arr.pop();
    data_arr.shift();
    data_arr.map(item => {
      symp_diab1.push(item)
    });
    let jsonContent = JSON.stringify({ "Type_1": symp_diab1 });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
  }).catch(err => console.error(err));

// Type 1
axios(url_3)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    $('.content div p:nth-of-type(5) + ul', html).each(function() {
      let data_arr = $(this).text().split('\n');
      popAndShift(data_arr).map(item => {
        symp_diab1.push(item);
      })
    })
    let jsonContent = JSON.stringify({ "Type1": symp_diab1 });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
  }).catch(err => console.error(err));

// Type 2
axios(url_4)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr = $('.content div p:nth-of-type(5) + ul').text().split('\n');
    popAndShift(data_arr).map(item => {
      symp_diab2.push(item.trim());
    })
    console.log(symp_diab2);
    let jsonContent = JSON.stringify({ "Type-2": symp_diab2 });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );

  }).catch(err => console.error(err));

// D - insipidus
axios(url_5)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.content div p:nth-of-type(4) + ul').text().split('\n');
    popAndShift(data_arr1).map(item => {
      symp_insipidus.push(item.trim());
    });

    let data_arr2 = $('.content div p:nth-of-type(6) + ul').text().split('\n');
    popAndShift(data_arr2).map(item => {
      symp_insipidus_kids.push(item.trim());
    });
    let jsonContent = JSON.stringify({ "Insipidus": symp_insipidus, "Insipidus(Kids)": symp_insipidus_kids });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );

  }).catch(err => console.error(err));

// common symptoms
axios(url_6)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symptoms.push(item.trim());
    });

    let data_arr2 = $('.js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split(':');data_arr2.shift();
    let data_female = data_arr2[0].split(',');
    let data_male = data_arr2[1].split(',');

    symp_female.push(data_female[0]);
    symp_female.push(data_female[1].split('.')[0].split('and')[1]);
    data_male.map(item => {
      symp_male.push(item);
    });


    let data_arr3 = $('.js-section--symptoms-and-causes ul:nth-of-type(3) + p').text().split('.');
    popAndShift(data_arr3)
    data_arr3.shift();
    symp_diab1.push(data_arr3[0].split(',')[1].split('and')[0])

    let jsonContent = JSON.stringify({
      "Symptoms": symptoms,
      "Symptoms(male)": symp_male,
      "Symptoms(female)": symp_female,
      "Symptoms(Type-1)": symp_diab1
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
  }).catch(err => console.error(err));

// gestational diabetes
axios(url_7)
  .then(res=> {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_female_pregnant.push(item)
    });

    // causes
    let data_arr2 = $('.js-section--symptoms-and-causes ul:nth-of-type(1) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_female_pregnant_causes.push(item)
    })

    let jsonContent = JSON.stringify({
      "Symptoms(female_pregnant)": symp_female_pregnant,
      "Causes(female_pregnant)": symp_female_pregnant_causes,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    // console.log(symp_female_pregnant)
    // console.log(symp_female_pregnant_causes)
  }).catch(err => console.error(err));

// skin conditions
axios(url_8)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--overview ul:nth-of-type(1) li strong').text().split('.')[0].split(':');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_skin_rash.push(item)
    });


    let data_arr2 = $('.js-section--overview ul:nth-of-type(2) li strong').text().split('.')[0].split(':');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_skin_rash_general.push(item)
    });


    let data_arr3 = $('.js-section--overview ul:nth-of-type(3) li strong').text().split('.')[0].split(':');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_skin_irritation.push(item)
    });

    let jsonContent = JSON.stringify({
      "Skin_Rash": symp_skin_rash,
      "Skin_Rash(General)": symp_skin_rash_general,
      "Skin_Irritation": symp_skin_irritation
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    // console.log(symp_skin_rash);
    // console.log(symp_skin_rash_general);
    // console.log(symp_skin_irritation);
  }).catch(err => console.error(err));

// ketoacidosis
axios(url_9)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(1) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_ketoacidosis.push(item)
    })

    let data_arr2 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_ketoacidosis.push(item)
    })
    let jsonContent = JSON.stringify({
      "Ketoacidosis": symp_ketoacidosis,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_ketoacidosis);
  }).catch(err => console.error(err));

// Foot condition
axios(url_10)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(1) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_foot_neuropathy.push(item)
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_foot_neuropathy_foot_ulcers.push(item)
    })
    let jsonContent = JSON.stringify({
      "Foot_Neuropathy": symp_foot_neuropathy,
      "Foot_Neuropathy(Foot_Ulcers)": symp_foot_neuropathy_foot_ulcers
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_foot_neuropathy);
    console.log(symp_foot_neuropathy_foot_ulcers);
  }).catch(err => console.error(err));

// Coma
axios(url_11)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_coma.push(item)
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_coma.push(item)
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(5) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_coma.push(item)
    })

    let data_arr4 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(6) li').text().split('.');
    data_arr4.pop();
    data_arr4.map(item => {
      symp_coma.push(item)
    })
    let jsonContent = JSON.stringify({
      "Coma": symp_coma,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );

    console.log(symp_coma);
  }).catch(err => console.error(err));

// hyperglycemia
axios(url_12)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_hyperglycemia.push(item)
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_hyperglycemia.push(item)
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(5) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_hyperglycemia.push(item)
    })
    let jsonContent = JSON.stringify({
      "Hyperglycemia": symp_hyperglycemia,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_hyperglycemia);
  }).catch(err => console.error(err));

// brittle
axios(url_13)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(1) li a');
    
    data_arr1.map( (key, val)  => {
      symp_brittle.push($(val).text())
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_brittle.push(item)
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_brittle.push(item)
    })
    
    let data_arr4 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr4.pop();
    data_arr4.map(item => {
      symp_brittle.push(item)
    })
    let jsonContent = JSON.stringify({
      "Brittle": symp_brittle,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_brittle);
  }).catch(err => console.error(err));

// retinopathy
axios(url_14)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let data_node = $('.nhsuk-grid-column-two-thirds section:nth-of-type(4) ul li');

    for(let i =0; i < data_node.length; i++ ){
      if(data_node[i].name === 'li') {
        symp_retinopathy.push(Object.values(data_node[i].children[0])[1]);
      }
    }
    let jsonContent = JSON.stringify({
      "Retinopathy": symp_retinopathy,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_retinopathy);
  }).catch(err => console.error(err));

//diabetes - type 1 kids
axios(url_15)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let data_node = $('#main-content .acces-list-container.rc-list + div + h2 + p + ul li');


    for(let i =0; i < data_node.length; i++ ){
      if(data_node[i].name === 'li') {
        symp_diab1_kids.push(data_node[i].children[0].data);
      }
    }
    let jsonContent = JSON.stringify({
      "Type-1(Kids)": symp_diab1_kids,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_diab1_kids);
  }).catch(err => console.error(err));


//diabetes - type 2 kids
axios(url_16)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let data_node = $('#main-content .acces-list-container.rc-list + div + h2 + p + p + ul li');

    for(let i =0; i < data_node.length; i++ ){
      if(data_node[i].name === 'li') {
        symp_diab2_kids.push(data_node[i].children[0].data);
      }
    }
    let jsonContent = JSON.stringify({
      "Type-2(Kids)": symp_diab2_kids,
    });
    fs.writeFile(
      "SymptomCollection.json",
      jsonContent + ",\n",
      { flag: "a+" },
      function (err) {
        if (err) {
          console.log("Error writing JSON object to file");
          return console.log(err);
        }
      }
    );
    console.log(symp_diab2_kids);
  }).catch(err => console.error(err));

app.listen(PORT, () => console.log('server running', PORT))
