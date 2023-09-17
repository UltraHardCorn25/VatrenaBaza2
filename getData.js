const admin = require("firebase-admin");
const serviceAccount = require("../VatrenaBaza2/vatrenabaza2-firebase-adminsdk-wk1z2-4be9865e04.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://fir-fbe07-default-rtdb.europe-west1.firebasedatabase.app",
});
const message = {
  notification: {
    title: "Notifikacija",
    body: "Pozdrav1",
  },
  topic: "school", // Replace with the name of the topic you want to send the message to
};

function Send() {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message to topic:", response);
    })
    .catch((error) => {
      console.error("Error sending message to topic:", error);
    });
}
export { Send };
