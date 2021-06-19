const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    status: {  // current status of the given URL.
        type: String,
    },
    availability: { //percentage of the URL availability
        type: String,
    },
    outages: Number, // total number of URL downtimes.

    downtime: Number, //total time, in seconds, of the URL downtime

    uptime: Number,  //total time, in seconds, of the URL uptime

    responseTime: Number, //average response time for the URL
    
    history: Number, //timestamped logs of the polling requests
     
})