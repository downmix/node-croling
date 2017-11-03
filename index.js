var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    url = 'http://www.test.com';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            var title, release, rating;
            var json = { no : "", title : "", img : ""};

            //$('.rcp_m_list2 .row .col-xs-4')
            
            $('.title_wrapper').filter(function(){
                var data = $(this);
                console.log(data.children(), '<< [ data ]');
                title = data.children().first().text();            
                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            $('.star-box-giga-star').filter(function(){
                var data = $(this);
                rating = data.text();

                json.rating = rating;
            })

            var temp = $('.title_wrapper').children()[0].children[0].data
            console.log(temp, '<< [ temp ]');
            json.title = temp;
                
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('output.json file check');
        })


    res.send('Check console')

    }) ;
})

app.listen('8081')
console.log('port 8081~~');
exports = module.exports = app;
