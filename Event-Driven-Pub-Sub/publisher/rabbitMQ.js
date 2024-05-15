const amqp = require("amqplib");

// RabbitMQ connection URL
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

// Function to publish event to RAbbitMQ
async function publishEvent(event) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel()
        const exchange = "fish_species_exchange";

        // Ensure the exchange exist
        await channel.assertExchange(exchange, "fanout", { durable: false });

        // Publish the event to the exchange
        channel.publish(exchange, "", Buffer.from(JSON.stringify(event)));

        // Close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error publishing event:", error);
    }
};

// Export the publishEvent function
module.exports = {
    publishEvent
};