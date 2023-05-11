const express = require("express");
const app = express();
const { WebhookClient } = require("dialogflow-fulfillment");

app.get("/", (req, res) => {
  res.send("Hi from server!");
});

app.post("/", express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function handleIntent(agent) {
    const orderId = agent.parameters.orderId;
    const orderDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const response = `Order Status for ${orderId} is ${orderDate}`;
    agent.add(response);
  }

  const intentMap = new Map();
  intentMap.set("TakeOrderId", handleIntent);
  agent.handleRequest(intentMap);
});

app.listen(8080, () => {
  console.log("server running...");
});
