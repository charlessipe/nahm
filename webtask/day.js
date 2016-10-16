var firebase = require("firebase@3.0.4");
var moment = require("moment@2.11.2");

var config = {
    apiKey: "AIzaSyCbqUgLObGp-B-Aubjw--OSsRrpgdXGR0U",
    authDomain: "shower-water-flow-381ec.firebaseapp.com",
    databaseURL: "https://shower-water-flow-381ec.firebaseio.com",
    storageBucket: "shower-water-flow-381ec.appspot.com",
    messagingSenderId: "748413230083",
    serviceAccount: {
        project_id: "shower-water-flow-381ec",
        clientEmail: "webtask@shower-water-flow-381ec.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHlrDWM6bLkIwU\nIlrRFtswgkwZh5aJEvMGyFduAuPK7YiXd9+ewB3NZ+LiLAG5mO6AnRjPi0Of6ava\n/Se5UYgQlLD6G9HOxOqwC4acJfhJK61rQCeQRGgvDKmfQvWEKfsPvOWkoloTsUfk\nIPQW6jJPpVf8hkGScrKU4ApZGaYB0M1oIOi3mMxQAL6Cf7S1fDVS1gK7xGc0aMLU\nAE0doLI3zezYZjdWN7O1nJeH9EuxkVZwdKqvQUrVN3C5rEkYFSq6jDDw+4QjmSxR\n/kxU3IcO2Q/3HtJsNhiOW8XTNnMxybOe5ZQBTosVJS7MV1yuOl/Fkzbq1tc7mwzJ\n9360In0jAgMBAAECggEAFzo/TD5om+ovkyxIW2sIiUWwq4vvBfbRl6l7G090ySoJ\nqm8F9EixbzU231F1xe65WvhtacHwVczw9iReGiAV8LANRJ42NZUPJvvAZ623jnRp\n00B9GjoL0eXsW5+ESSRFlphKNXW7e+02y6LWJVCOGFzKt5W8TdnRVKgaLDJi8nTw\npVRH8pkOQKR8ofIQaj1zNBCW6tz/RDLcQqz9e3di7MS1/siR7exMcON+ltcciLLs\nyJp4BEMfYfPgjGgLPcp5qQl+acJYg13w8O1az7ctnACzdnRG8Iaa6aYhouOIcR/3\naC6Rr83QLkVDMCPp6pjqJSl0nY25zwhFD+/icW9+EQKBgQDyTgkK5MCKBFK4QEkw\noXhm1DDUWVn4VhaEzCwpPAKYPx9i9or32MqxvhK1wcHplggYgS/rpkIIRFqYSDdY\n1yWpc94toi+wz13Zr2qHNGM/iSwWIaf4mmZzRdajrixQZg+SM4J6emO3W5AI+ln7\nTzXhbziKRXbYkY/EkiyKu6HU+wKBgQDS3pXCZ7SNBXh6pb5GLJbF0VKcqel43T4w\nSNXp7tAiOSOFO9M8UXtLTNRQH+R3ZOTKfKtVYbRjdP66sfLi1U1e/TNrJjln7keY\n5BYLYD9ecON4RJKyUfo5kJUiYQO2wvyJqtNhAgRNqeSUo2Xu7lh7UFwGQ59R2KnF\nz6R5jGzv+QKBgDYI7v1N7B4bPrM2Ktw8dhRAZ69DScwWrqjou0RqzI1VLlOsdWs2\nHmWq5JNB5VOJEL8eOCiOCBW94JIrMKSQPibe3wJAM/BzHhPIibIjHarylTFOSh4n\nmIdGYMpZsiovyHMrJ4LWvlwKgEFwSxa/IF3opqw3N3yuYWhNzL8Xfsx3AoGAHir6\nAfYUPpipw+IydpeqemKYDxG/9Sqx2vaQpAcmf77s9gK5FcgSe5NiTJRDe1FT6iQr\n3us7g38ZclxDA3DAwPY4hPvS+qt8UsNO5BHA/yHnaS1mT1yrD9E/hMucXGlI9+kY\nlKhVNUc5DIrT6nru7bVxdPP3tx3oLASo4zrT2wECgYAbpHBWzpIWA/ab0bU11qbF\nLeVo1k3BU1bCn9vU3zm4sy/W04vDfMLyhpccg+eKpxfmVWfBfh12a04zXxaL8pgt\nFJkRlXDIW6omPRAmeg56CN/goYy4V9j43tV0hhRpty3JBxP7mKSC7DbD4OnQUJbv\not5InLGVGAnMOjf6AH9wFw==\n-----END PRIVATE KEY-----\n"
    },
    threshhold: 0
};

var deviceMap = {
    shower: {
        id: 1
    },
    sink: {
        id: 2,
    },
    washingmachine: {
        id: 3,
    },
    bath: {
        id: 4,
    },
    hose: {
        id: 5,
        upper: {
            amount: 10000,
            message: "By the way, the hose has been on for longer than usual. Check and make sure you've turned it off."
        }
    },
    beer: {
        id: 6,
        upper: {
            amount: 1000,
            message: "By the way, you've been partying way too much. I'll have to alert your parents if this continues."
        }
    },
    toilet: {
        id: 7,
        upper: {
            amount: 0,
            message: "By the way, you've used the toilet way too many times today. Do you need to see a doctor?"
        }
    }
}

function init() {
    if (firebase.apps.length === 0) {  
        firebase.initializeApp(config);
    }
}

function sendAmount(database, device, callback) {
    var ref = database.ref("sessions");
    ref.once("value", function(snapshot) {
        var data = snapshot.val();        

        var deviceId = getDeviceId(device);
        var startTime;
        var today = getStartOfDay();
        var deviceAmountMap = {};
        
        for (startTime in data) {
            if (startTime > today) {
                var id = parseInt(data[startTime].deviceId);
                if (deviceAmountMap[id] == null) {
                    deviceAmountMap[id] = 0;
                }
                deviceAmountMap[id] += data[startTime].amount;
            }
        }

        var response = createResponse(device, deviceAmountMap);		

        callback(null, response);
    });
}

function createResponse(device, deviceAmountMap) {
    var deviceId = getDeviceId(device);
    var deviceAmount = deviceAmountMap[deviceId] || 0;
    var response = "You used about " + getAmountString(deviceAmount) + " in the " + device + " today.";

    // make Alexa smart
    for (var key in deviceMap) {
        var d = deviceMap[key];
        var amount = deviceAmountMap[d.id] || 0;

        if (d.upper != null && amount >= d.upper.amount) {
            response += " " + d.upper.message;
        }
    }

    return response;
}

function getAmountString(amount) {
    var unit = "ML";
    if (amount > 1000) {
        amount = parseInt(amount / 1000);
        unit = "L"
    }
    return amount + unit;
}

function convertToNumber(obj) {
    var key;
    for (key in obj) {
        obj[key] = parseInt(obj[key]);
    }
}

function getStartOfDay() {	
    var startOfDay = moment().utcOffset('-0700').startOf('day').unix();
    return startOfDay;
}

function getDeviceId(device) {
    return deviceMap[device] ? deviceMap[device].id : 1;
}

module.exports = function (context, callback) {

    init();

    var database = firebase.database();
    var device = context.query.device;

    sendAmount(database, device, callback);
}