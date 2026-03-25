const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 SERVE UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/calculate", (req, res) => {
  let { km, litri, pret } = req.body;

  km = Number(km);
  litri = Number(litri);
  pret = Number(pret);

  if (
    isNaN(km) || isNaN(litri) || isNaN(pret)
  ) {
    return res.status(400).json({ error: "Date invalide" });
  }

  if (km <= 0 || litri <= 0 || pret <= 0) {
    return res.status(400).json({ error: "Valorile trebuie sa fie > 0" });
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
  console.log(`🚀 Server running on port ${PORT}`);
});