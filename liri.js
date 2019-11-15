//We first require  
require("dotenv").config();
var inquirer = require('inquirer');
var axios = require('axios');
var keys = require("./keys.js");
var dotenv = require('dotenv');
var moment = require('moment');

inquirer
    .prompt([
        {
            type: 'checkbox',
            message: 'which the following genres would you like to select?',
            name: 'type',
            choices: [
                {
                    name: 'movie'
                },
                {
                    name: 'song'
                },
                {
                    name: 'artist'
                },
                {
                    name: 'read_text'
                }
            ]
        }
    ]).then(answers => {
        console.log(answers.type);
        //here the keys
        if (answers.type == 'song') {
            inquirer.prompt([{
                type: 'input',
                message: 'what is the name of the ' + answers.type + ' you are trying to look up?',
                name: 'name'
            }]).then(answers => {
                console.log(answers.name);
                song = answers.name;
                var Spotify = require('node-spotify-api');
                var spotify = new Spotify(keys.spotify);
                spotify.search({ type: 'track', query: song }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log(data.tracks.items);
                });
            });
        };
        if (answers.type == 'artist') {
            inquirer.prompt([{
                type: 'input',
                message: 'what is the name of the ' + answers.type + ' you are trying to look up?',
                name: 'name'
            }]).then(answers => {
                console.log(answers.name);
                var artist = answers.name;
                var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                console.log(queryUrl);
                axios.get(queryUrl).then(
                    function (response) {
                        console.log(response.headers.date);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log("---------------Data---------------");
                            console.log(error.response.data);
                            console.log("---------------Status---------------");
                            console.log(error.response.status);
                            console.log("---------------Status---------------");
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an object that comes back with details pertaining to the error that occurred.
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });

            });
        };

        if (answers.type == 'movie') {
            inquirer.prompt([{
                type: 'input',
                message: 'what is the name of the ' + answers.type + ' you are trying to look up?',
                name: 'name'
            }]).then(answers => {
                console.log(answers.name);
                var movie = answers.name;
                var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
                console.log(queryUrl);
                axios.get(queryUrl).then(
                    function (response) {
                        console.log(response.data.Title);
                        console.log(response.data.Year);
                        console.log(response.data.imdbRating);
                        console.log(response.data.Ratings[0].Value);
                        console.log(response.data.Country);
                        console.log(response.data.Language);
                        console.log(response.data.Plot);
                        console.log(response.data.Actors);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            console.log("---------------Data---------------");
                            console.log(error.response.data);
                            console.log("---------------Status---------------");
                            console.log(error.response.status);
                            console.log("---------------Status---------------");
                            console.log(error.response.headers);
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an object that comes back with details pertaining to the error that occurred.
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
            });
        };
        if (answers.type == 'read_text') {
            console.log("feature coming soon");
        };
    });
    //console log the answers to see how the data is being recorded and how to use it
    //.then(answers => {
    //    console.log(JSON.stringify(answers, null, '  '));
    //});



