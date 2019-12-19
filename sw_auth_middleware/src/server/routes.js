import passport from "passport";

export default app => {
  app.all(
    "/auth",
    passport.authenticate("sw", { session: false }),
    (req, res) => {
      res.json({ status: "ok", token: req.session.sessid });
    }
  );

  app.post("/group", (req, res) => {
    if(req.body && req.body.group) {
      req.session.group = req.body.group;
      res.json({status: "ok", message: `Group updated to ${req.body.group}`});
    } else {
      res.status(400).json({status: "fail", message: "invalid request body"})
    }
  })

  app.get("/group", (req, res) => {
    if(req.body && req.body.group) {
      res.json({status: "ok", message: `Group updated to ${req.body.group}`});
    }
  })
};
