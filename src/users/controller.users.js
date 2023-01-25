import { Router } from "express";

const router = Router();

// const anUser = {
//   name: "Javier",
//   lastname: "Aguirre",
//   age: 24,
//   email: "javieraguirreco10@gmail.com",
//   phone: 936118847,
// };

router.get("/", (req, res) => {
  res.render("index.hbs");
});

export default router;