const express = require("express");
const bodyParser = require("body-parser")
const fishRecipeRoutes = require("./src/routes/fishRecipeRoutes")
const amqp = require("amqplib");

const app = express()
app.use(bodyParser.json());

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost"

app.use('/fish-recipe', fishRecipeRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Function to consume events from RabbitMQ
async function consumeEvents(){
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const exchange = "fish_species_exchange";

        await channel.assertExchange(exchange, "fanout", { durable: false });
        
        const queue = "fish_recipe_queue";
        await channel.assertQueue(queue, { durable: false });

        await channel.bindQueue(queue, exchange, "");

        channel.consume(queue, (msg) => {
            if (msg.content) {
                const event = JSON.parse(msg.content.toString());
                handleEvent(event);
            }
        }, { noAck: true} );
    } catch (error) {
        console.error("Error consuming events:", error);
    }
}


// Function to handle events
function handleEvent(event) {
    switch (event.type) {
        case "FISH_SPECIES_CREATED":
            console.log("New fish species created:", event.data);
            break;
        default:
            console.warn("Unknown event type:", event.type);
    }   
}

// Start consuming events
consumeEvents();