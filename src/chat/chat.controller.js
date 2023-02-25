import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("chat.handlebars", {
    title: "| Chatea con nosotros",
    style: "index.css",
  });
});

export default router;