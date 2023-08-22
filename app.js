const express = require('express');
const app = express();
const path = require('path');

let request = require('request');

const {my_key} = require('./config.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res, next) => {
    res.render('index.pug');
});

app.get('/search', (req, res, next) => {
    const keyword = req.query.search;
    const my_uri = `http://www.omdbapi.com/?apikey=${my_key}&t=${keyword}`;
    
    console.log(req.query.search);
    console.log("your request:", my_uri);

    request.get(uri=my_uri, (err, rows, body) => {
        if(err){
            console.log(err);
            return;
        }
        else{
            const search_res = JSON.parse(body);
            //console.log(search_res);

            res.render('search.pug', {title: search_res.Title, post_link: search_res.Poster});
        }
    });
});

app.listen(3000, () => {
    console.log("server start");
})

my_json_parsing = (str) => {
    let parsed_str = str.substring(1, str.length - 1).split(',');
    let parsed_body = {};
            
    for(let i in parsed_str){
        let sub_list = parsed_str[i].split(':');

        parsed_body[sub_list[0]] = sub_list[1];
    }

    return parsed_body;
}