const Opportunity = require("../models/Opportunity");
const Company = require("../models/Company");

// ======================================
// Get All Opportunities
// ======================================

const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();

    res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities: opportunities,
    });
  } catch (error) {
    console.error("Get All Opportunities Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch opportunities",
    });
  }
};

// ======================================
// Get Open Opportunities
// ======================================

const getOpenOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      status: "Open",
    });

    res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities: opportunities,
    });
  } catch (error) {
    console.error("Get Open Opportunities Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch open opportunities",
    });
  }
};

// ======================================
// Get Top Companies
// ======================================

const getTopCompanies = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();

    const companyMap = {};

    opportunities.forEach((opportunity) => {
      const companyId = opportunity.companyId;

      if (!companyId) return;

      if (!companyMap[companyId]) {
        companyMap[companyId] = 0;
      }

      companyMap[companyId]++;
    });

    const topCompanyIds = Object.entries(companyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topCompanies = await Promise.all(
      topCompanyIds.map(async ([companyId, opportunityCount]) => {
        const company = await Company.findById(companyId);

        return {
          companyId: companyId,
          companyName: company?.companyName || "Unknown Company",
          city: company?.city || "—",
          opportunityCount: opportunityCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: topCompanies.length,
      companies: topCompanies,
    });
  } catch (error) {
    console.error("Get Top Companies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top companies",
    });
  }
};

module.exports = {
  getAllOpportunities,
  getOpenOpportunities,
  getTopCompanies,
};