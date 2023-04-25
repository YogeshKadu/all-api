const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
// const fetch = require('node-fetch');
// var request = require('request');
const app = express();
app.use(cors());


const url = 'https://www.google.com/search?q=harry&biw=1745&bih=865&tbm=isch&sxsrf=APwXEdc4XNaq_O97Sq2BPOBWp3ZlplTJhw:1682413697712&source=lnms&sa=X&ved=2ahUKEwjB0sS218T-AhUojGMGHTH1C8EQ_AUoAnoECAEQBA';

app.get('/get-images',(req,res)=>{
    axios(url)
        .then(response => {
            const html = response.data;

            const $ =  cheerio.load(html);
            const output ={
                status:200,
                images:[]
            }
            $('img',html).each(function(){
                output.images.push(getimageurl(`${url}${$(this).attr('src')}`));
            });
            res.send(output)
        })
        .catch(error => console.log(error));
});
function getimageurl(source){
    // google get image from search
    if(source.includes('google') && (source.split('http').length - 1) > 1){
        return source.split(/(?=http)/g)[1];
    }
}

app.listen(process.env.PORT || 5005, () => {
    console.log(`localhost:5005`);
});


// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
// import Parser from 'node-html-scraper';

// const app = express();
// app.use(cors());
// var fetchedHtml=`<html> 
//     <img src="/test2.png" />
// </html>`;
// app.get("/", (req, res) => {
//     if(req.query.url !== null)
//     fetch(req.query.url)
//         .then((response) => response.text())
//         .then((html) => {
//             parsedHtml = Parser.parseHtml(fetchedHtml, req.query.url);
//             console.log(parsedHtml);
//             res.send(html);
//         })
//         .catch((error) => {
//             console.log(error);
//             res.send("Error");
//         });
// });

// app.listen(process.env.PORT || 5005, () => {
//   console.log(`started on : 5005`);
// });
