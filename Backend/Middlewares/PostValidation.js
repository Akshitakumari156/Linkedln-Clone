export const createPostValidation = (req, res, next) => {
  if (!req.body.text && !req.file) {
    return res.status(400).json({ error: "Post text or image required" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ error: "User ID required" });
  }
  next();
};

export const updatePostValidation = (req, res, next) => {
  if (!req.body.text && !req.file) {
    return res.status(400).json({ error: "Nothing to update" });
  }
  next();
};