const Opportunity = require("../models/Opportunity");

const getOpenOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: "Open" })
      .populate("companyId", "companyName industry city state")
      .sort({ postedOn: -1 });

    res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    console.error("Get Open Opportunities Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch opportunities" });
  }
};

module.exports = { getOpenOpportunities };
