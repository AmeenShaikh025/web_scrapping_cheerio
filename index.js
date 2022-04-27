const PORT = process.env.PORT || 4000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const writeStream = fs.createWriteStream('Diabetes.csv');
// Write Headers
writeStream.write(`Symtoms(common), type-1 \n`);
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

const symptoms = [];
const symp_diab1 = [];
const symp_diab1_kids = [];
const symp_diab2 = [];
const symp_diab2_kids = [];
const symp_insipidus = [];
const symp_insipidus_kids = [];
const symp_male = [];
const symp_female = [];
const symp_female_pregnant = [];
const symp_female_pregnant_causes = [];
const symp_skin_irritation  = [];
const symp_skin_rash = [];
const symp_skin_rash_general = [];
const symp_ketoacidosis = [];
const symp_foot_neuropathy = [];
const symp_foot_neuropathy_foot_ulcers = [];
const symp_coma = [];
const symp_hyperglycemia = []; 
const symp_brittle = []; 
const symp_retinopathy = []; 


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
      symptoms.push({
        symptom_common: symptom
      });
      // Write Row To CSV
      writeStream.write(`${symptom} \n`);
    });
    //type 1 diabetes
    // const type1 = $('.health-detail-content p:nth-of-type(6) a:nth-of-type(4)').text();
    // writeStream.write(`,${type1} \n`);

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
      symp_diab1.push({
        symptom_diab1: item
      })
    });
    
  }).catch(err => console.error(err));

// Type 1
axios(url_3)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    $('.content div p:nth-of-type(5) + ul', html).each(function() {
      let data_arr = $(this).text().split('\n');
      popAndShift(data_arr).map(item => {
        symp_diab1.push({
          symptom_diab1: item
        });
      })
      // Write Row To CSV
      // writeStream.write(`${symptom} \n`);
    })
  }).catch(err => console.error(err));

// Type 2
axios(url_4)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr = $('.content div p:nth-of-type(5) + ul').text().split('\n');
    popAndShift(data_arr).map(item => {
      symp_diab2.push({
        symptom_diab2: item.trim()
      });
    })
    console.log(symp_diab2);

  }).catch(err => console.error(err));

// D - insipidus
axios(url_5)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.content div p:nth-of-type(4) + ul').text().split('\n');
    popAndShift(data_arr1).map(item => {
      symp_insipidus.push({
        symptom_insipidus: item.trim()
      });
    });

    let data_arr2 = $('.content div p:nth-of-type(6) + ul').text().split('\n');
    popAndShift(data_arr2).map(item => {
      symp_insipidus_kids.push({
        symp_insipidus_kids: item.trim()
      });
    });

    console.log(symp_insipidus)
    console.log(symp_insipidus_kids)

  }).catch(err => console.error(err));

// common symptoms
axios(url_6)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symptoms.push({
        symptom_common: item.trim()
      });
    });

    let data_arr2 = $('.js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split(':');data_arr2.shift();
    let data_female = data_arr2[0].split(',');
    let data_male = data_arr2[1].split(',');

    symp_female.push({
      symptom_female: data_female[0]
    });
    symp_female.push({
      symptom_female: data_female[1].split('.')[0].split('and')[1]
    });
    data_male.map(item => {
      symp_male.push({
        symptom_male: item
      })
    });


    let data_arr3 = $('.js-section--symptoms-and-causes ul:nth-of-type(3) + p').text().split('.');
    popAndShift(data_arr3)
    data_arr3.shift();
    symp_diab1.push({
      symptom_diab1: data_arr3[0].split(',')[1].split('and')[0]
    })

    console.log(symp_female)
    console.log(symp_male)
    console.log(symptoms)
    console.log(symp_diab1)
  }).catch(err => console.error(err));

// gestational diabetes
axios(url_7)
  .then(res=> {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_female_pregnant.push({
        symptom_female_pregrant: item
      })
    });

    // causes
    let data_arr2 = $('.js-section--symptoms-and-causes ul:nth-of-type(1) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_female_pregnant_causes.push({
        symp_female_pregnant_causes: item
      })
    })


    console.log(symp_female_pregnant)
    console.log(symp_female_pregnant_causes)
  }).catch(err => console.error(err));

// skin conditions
axios(url_8)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-section--overview ul:nth-of-type(1) li strong').text().split('.')[0].split(':');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_skin_rash.push({
        sympt_skin_rash: item
      })
    });


    let data_arr2 = $('.js-section--overview ul:nth-of-type(2) li strong').text().split('.')[0].split(':');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_skin_rash_general.push({
        symp_skin_rash_general: item
      })
    });


    let data_arr3 = $('.js-section--overview ul:nth-of-type(3) li strong').text().split('.')[0].split(':');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_skin_irritation.push({
        symp_skin_irritation: item
      })
    });

    console.log(symp_skin_rash);
    console.log(symp_skin_rash_general);
    console.log(symp_skin_irritation);
  }).catch(err => console.error(err));

// ketoacidosis
axios(url_9)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(1) li').text().split('.');
    data_arr1.pop();
    data_arr1.map(item => {
      symp_ketoacidosis.push({
        symp_ketoacidosis: item
      })
    })

    let data_arr2 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_ketoacidosis.push({
        symp_ketoacidosis: item
      })
    })

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
      symp_foot_neuropathy.push({
        symp_foot_neuropathy: item
      })
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_foot_neuropathy_foot_ulcers.push({
        symp_foot_neuropathy_foot_ulcers: item
      })
    })

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
      symp_coma.push({
        symp_coma_hyperglycemia: item
      })
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_coma.push({
        symp_coma_high_blood_sugar: item
      })
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(5) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_coma.push({
        symp_coma_low_blood_glucose: item
      })
    })

    let data_arr4 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(6) li').text().split('.');
    data_arr4.pop();
    data_arr4.map(item => {
      symp_coma.push({
        symp_coma__too_low_blood_sugar: item
      })
    })

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
      symp_hyperglycemia.push({
        symp_hyperglycemia: item
      })
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr2.pop();
    data_arr2.map(item => {
      symp_hyperglycemia.push({
        symp_hyperglycemia: item
      })
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(5) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_hyperglycemia.push({
        symp_hyperglycemia: item
      })
    })

    console.log(symp_hyperglycemia);
  }).catch(err => console.error(err));

// brittle
axios(url_13)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    let data_arr1 = $('.js-health-article__content .js-section.js-section--symptoms-and-causes ul:nth-of-type(1) li a');
    
    data_arr1.map( (key, val)  => {
      symp_brittle.push({
        symp_brittle_causes: $(val).text()
      })
    })

    let data_arr2 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(2) li').text().split('.');
    console.log(data_arr2);
    data_arr2.pop();
    data_arr2.map(item => {
      symp_brittle.push({
        symp_brittle: item
      })
    })
    
    let data_arr3 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(3) li').text().split('.');
    data_arr3.pop();
    data_arr3.map(item => {
      symp_brittle.push({
        symp_brittle_hyperglycemia: item
      })
    })
    
    let data_arr4 = $('.js-health-article__content .js-section--symptoms-and-causes ul:nth-of-type(4) li').text().split('.');
    data_arr4.pop();
    data_arr4.map(item => {
      symp_brittle.push({
        symp_brittle_hyperglycemia_untreated_ketoacidosis: item
      })
    })

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
        symp_retinopathy.push({
          symp_retinopathy: Object.values(data_node[i].children[0])[1]
        });
      }
    }

    console.log(symp_retinopathy);
  }).catch(err => console.error(err));

//diabetes - type 1 kids
axios(url_15)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let data_node = $('#main-content .content div:nth-of-type(2) ul:nth-of-type(1) li').text();

    // console.log('@@@', data_node);
    // for(let i =0; i < data_node.length; i++ ){
    //   if(data_node[i].name === 'li') {
    //     symp_diab1_kids.push({
    //       symp_retinopathy: Object.values(data_node[i].children[0])[1]
    //     });
    //   }
    // }

    console.log(symp_diab1_kids);
  }).catch(err => console.error(err));


//diabetes - type 2 kids
axios(url_16)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    let data_node = $('.main #main-content .content > div:nth-of-type(2)').text();

    // console.log('###', data_node);
    // for(let i =0; i < data_node.length; i++ ){
    //   if(data_node[i].name === 'li') {
    //     symp_diab2_kids.push({
    //       symp_diab2_kids: Object.values(data_node[i].children[0])[1]
    //     });
    //   }
    // }

    console.log(symp_diab2_kids);
  }).catch(err => console.error(err));


app.listen(PORT, () => console.log('server running', PORT))
