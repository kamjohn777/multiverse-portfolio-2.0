// const {onRequest} = require("firebase-functions/v2/https");
const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51NfAwmFUHyppZGVYFAIVUQD5eNDc9c9ZGaaP0HzKxRgvsVJsREQQTgVVTom03ZjGaGxVcR8rg4bsrm1oTmicEwPN00q4aUjrwh')
const logger = require("firebase-functions/logger");

// API

// - App config
const app = express();

// - Middlelewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world this is kamazon'))

app.post('/payment/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved Boom!!! for this amount >>>', total)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });

        response.status(201).send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        console.error('Error creating payment intent:', error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
})
// - Listen command

exports.api = functions.https.onRequest(app);
