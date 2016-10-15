var firebase = require("firebase@3.0.4");

var config = {
    apiKey: "AIzaSyCbqUgLObGp-B-Aubjw--OSsRrpgdXGR0U",
    authDomain: "shower-water-flow-381ec.firebaseapp.com",
    databaseURL: "https://shower-water-flow-381ec.firebaseio.com",
    storageBucket: "shower-water-flow-381ec.appspot.com",
    messagingSenderId: "748413230083",
    serviceAccount: {
        project_id: "shower-water-flow-381ec",
        clientEmail: "webtask@shower-water-flow-381ec.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHlrDWM6bLkIwU\nIlrRFtswgkwZh5aJEvMGyFduAuPK7YiXd9+ewB3NZ+LiLAG5mO6AnRjPi0Of6ava\n/Se5UYgQlLD6G9HOxOqwC4acJfhJK61rQCeQRGgvDKmfQvWEKfsPvOWkoloTsUfk\nIPQW6jJPpVf8hkGScrKU4ApZGaYB0M1oIOi3mMxQAL6Cf7S1fDVS1gK7xGc0aMLU\nAE0doLI3zezYZjdWN7O1nJeH9EuxkVZwdKqvQUrVN3C5rEkYFSq6jDDw+4QjmSxR\n/kxU3IcO2Q/3HtJsNhiOW8XTNnMxybOe5ZQBTosVJS7MV1yuOl/Fkzbq1tc7mwzJ\n9360In0jAgMBAAECggEAFzo/TD5om+ovkyxIW2sIiUWwq4vvBfbRl6l7G090ySoJ\nqm8F9EixbzU231F1xe65WvhtacHwVczw9iReGiAV8LANRJ42NZUPJvvAZ623jnRp\n00B9GjoL0eXsW5+ESSRFlphKNXW7e+02y6LWJVCOGFzKt5W8TdnRVKgaLDJi8nTw\npVRH8pkOQKR8ofIQaj1zNBCW6tz/RDLcQqz9e3di7MS1/siR7exMcON+ltcciLLs\nyJp4BEMfYfPgjGgLPcp5qQl+acJYg13w8O1az7ctnACzdnRG8Iaa6aYhouOIcR/3\naC6Rr83QLkVDMCPp6pjqJSl0nY25zwhFD+/icW9+EQKBgQDyTgkK5MCKBFK4QEkw\noXhm1DDUWVn4VhaEzCwpPAKYPx9i9or32MqxvhK1wcHplggYgS/rpkIIRFqYSDdY\n1yWpc94toi+wz13Zr2qHNGM/iSwWIaf4mmZzRdajrixQZg+SM4J6emO3W5AI+ln7\nTzXhbziKRXbYkY/EkiyKu6HU+wKBgQDS3pXCZ7SNBXh6pb5GLJbF0VKcqel43T4w\nSNXp7tAiOSOFO9M8UXtLTNRQH+R3ZOTKfKtVYbRjdP66sfLi1U1e/TNrJjln7keY\n5BYLYD9ecON4RJKyUfo5kJUiYQO2wvyJqtNhAgRNqeSUo2Xu7lh7UFwGQ59R2KnF\nz6R5jGzv+QKBgDYI7v1N7B4bPrM2Ktw8dhRAZ69DScwWrqjou0RqzI1VLlOsdWs2\nHmWq5JNB5VOJEL8eOCiOCBW94JIrMKSQPibe3wJAM/BzHhPIibIjHarylTFOSh4n\nmIdGYMpZsiovyHMrJ4LWvlwKgEFwSxa/IF3opqw3N3yuYWhNzL8Xfsx3AoGAHir6\nAfYUPpipw+IydpeqemKYDxG/9Sqx2vaQpAcmf77s9gK5FcgSe5NiTJRDe1FT6iQr\n3us7g38ZclxDA3DAwPY4hPvS+qt8UsNO5BHA/yHnaS1mT1yrD9E/hMucXGlI9+kY\nlKhVNUc5DIrT6nru7bVxdPP3tx3oLASo4zrT2wECgYAbpHBWzpIWA/ab0bU11qbF\nLeVo1k3BU1bCn9vU3zm4sy/W04vDfMLyhpccg+eKpxfmVWfBfh12a04zXxaL8pgt\nFJkRlXDIW6omPRAmeg56CN/goYy4V9j43tV0hhRpty3JBxP7mKSC7DbD4OnQUJbv\not5InLGVGAnMOjf6AH9wFw==\n-----END PRIVATE KEY-----\n",
    },
    threshhold: 0
};

function init() {
    if (firebase.apps.length === 0) {  
        firebase.initializeApp(config);
    }
}

function writeRawData(database, params) {
    var ref = database.ref("rawdata/" + params.time);

    ref.set({
        deviceId: params.deviceId,
        time: params.time,
        amount: params.amount,
    });
}

function writeDeviceData(database, lastSessionData, params) {
    var ref = database.ref("devicedata/" + params.deviceId);
    var lastSessionId = lastSessionData != null ? lastSessionData.lastSessionId : params.time;
    var lastAmount = lastSessionData != null ? lastSessionData.lastAmount + params.amount : params.amount;

    ref.set({
        lastSessionId: lastSessionId,
        lastAmount: lastAmount
    });
}

function resetDeviceData(database, params) {
    var ref = database.ref("devicedata/" + params.deviceId);
    ref.remove();
}

function writeSessionData(database, sessionId, lastAmount, params) {
    var ref = database.ref("sessions/" + sessionId);
    var endTime = params.time + 5;
    var amount = lastAmount + params.amount;

    console.log("Session data: ", {
        deviceId: params.deviceId,
        startTime: sessionId,
        endTime: endTime,
        amount: amount 
    });

    ref.set({
        deviceId: params.deviceId,
        startTime: sessionId,
        endTime: endTime,
        amount: amount
    });
}

function updateDeviceData(database, params) {    
    var ref = database.ref("devicedata/" + params.deviceId);
    ref.once("value", function(snapshot) {
        var data = snapshot.val();
        convertToNumber(data);

        // Data contains the last session data point
        console.log("Device", params.deviceId, "data: ", data);

        // Start with the threshold, then keep adding the amount up
        var lastAmount = data != null ? data.lastAmount : config.threshhold;        

        // Group session by the threshold
        if (data == null && params.amount > config.threshhold) {
            console.log("New session");
            writeDeviceData(database, data, params);
            writeSessionData(database, params.time, lastAmount, params);            
        } else if (lastAmount > config.threshhold && params.amount === config.threshhold) {
            console.log("Old session ends");
            writeSessionData(database, data.lastSessionId, lastAmount, params);
            resetDeviceData(database, params);
        } else if (params.amount > config.threshhold) {
            console.log("Old session continues");
            writeDeviceData(database, data, params);
            writeSessionData(database, data.lastSessionId, lastAmount, params);            
        }
    });
}

function convertToNumber(obj) {
    var key;
    for (key in obj) {
        obj[key] = parseInt(obj[key]);
    }
}

module.exports = function (context, callback) {

    init();

    var database = firebase.database();
    var params = context.query;

    convertToNumber(params);

    updateDeviceData(database, params);
    writeRawData(database, params);
    callback(null, "Success");
}