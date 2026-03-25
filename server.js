const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API IS LIVE 🚀");
});

app.post("/calculate", (req, res) => {
  const { km, litri, pret } = req.body;

  if (!km || !litri || !pret) {
    return res.status(400).json({ error: "Date lipsa" });
  }

  if (km <= 0 || litri <= 0 || pret <= 0) {
    return res.status(400).json({ error: "Valori invalide" });
  }

  if (litri > 200) {
    return res.status(400).json({ error: "Consum nerealist 😄" });
  }

  const consum = (litri / km) * 100;
  const costTotal = litri * pret;
  const cost100 = consum * pret;

  res.json({
    consum: consum.toFixed(2),
    costTotal: costTotal.toFixed(2),
    cost100: cost100.toFixed(2)
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});