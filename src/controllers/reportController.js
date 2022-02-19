const { generateProductReport } = require("../services/products");

const getProductReport = async (req, res) => {
  const { name } = req.body;
  const report = await generateProductReport(name);

  return res.status(200).json(report)
}

module.exports = {
  getProductReport,
}