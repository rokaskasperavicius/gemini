require("dotenv").config();

const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You will be acting as a categorization model. Given different bank transfer titles in danish you will have to categorize them from three categories: 'Food & Groceries', 'Transfers', 'Utilities'",
        },
      ],
    },
  ],
});

const main = async () => {
  await categorize("Wolt, Denmark Notanr 60322");

  await categorize("KVICKLY SUNDBY, KOEBENHAVN S Notanr 42215");

  await categorize("Advis 122408260738002 / Sent from RevolutFro");

  await categorize("Dankort-køb Coop App Nota 18888801101");

  await categorize("ITU KOEBENHAVN 663110, KOEBENHAVN S Notanr 00506");

  await categorize("APPLE.COM/BILL, CORK Notanr 00215");
};

const categorize = async (title) => {
  let result = await chat.sendMessage(title);
  console.log(title + " => " + result.response.text());
};

main();
