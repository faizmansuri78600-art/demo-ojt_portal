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

// ======================================
// Get Opportunities By Company
// ======================================

const getOpportunitiesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const opportunities = await Opportunity.find({
      companyId: companyId,
    }).sort({ postedOn: -1 });

    res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities: opportunities,
    });
  } catch (error) {
    console.error("Get Company Opportunities Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company opportunities",
    });
  }
};

// ======================================
// Add Opportunity
// ======================================

const addOpportunity = async (req, res) => {
  try {
    const {
      companyId,
      createdByCoordinatorId,
      title,
      description,
      department,
      duration,
      location,
      stipend,
      vacancies,
      lastDate,
      skillsRequired,
      eligibility,
      isPaid,
      status,
      postedOn,
    } = req.body;

    if (!companyId || !title) {
      return res.status(400).json({
        success: false,
        message: "Company ID and title are required",
      });
    }

    const opportunity = await Opportunity.create({
      _id: "O" + Date.now(),
      companyId,
      createdByCoordinatorId: createdByCoordinatorId || "",
      title,
      description: description || "",
      department: department || "",
      duration: duration || "",
      location: location || "",
      stipend:
        stipend === "" || stipend === null || stipend === undefined
          ? 0
          : Number(stipend),
      vacancies:
        vacancies === "" || vacancies === null || vacancies === undefined
          ? 0
          : Number(vacancies),
      lastDate: lastDate || "",
      skillsRequired: skillsRequired || "",
      eligibility: eligibility || "",
      isPaid: Boolean(isPaid),
      status: status || "Open",
      postedOn: postedOn || new Date().toISOString().split("T")[0],
    });

    res.status(201).json({
      success: true,
      message: "Opportunity added successfully",
      opportunity: opportunity,
    });
  } catch (error) {
    console.error("Add Opportunity Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add opportunity",
    });
  }
};

// ======================================
// Update Opportunity
// ======================================

const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      department,
      duration,
      location,
      stipend,
      vacancies,
      lastDate,
      skillsRequired,
      eligibility,
      isPaid,
      status,
      postedOn,
    } = req.body;

    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    opportunity.title = title ?? opportunity.title;
    opportunity.description = description ?? opportunity.description;
    opportunity.department = department ?? opportunity.department;
    opportunity.duration = duration ?? opportunity.duration;
    opportunity.location = location ?? opportunity.location;

    if (stipend !== undefined) {
      opportunity.stipend =
        stipend === "" || stipend === null ? 0 : Number(stipend);
    }

    if (vacancies !== undefined) {
      opportunity.vacancies =
        vacancies === "" || vacancies === null ? 0 : Number(vacancies);
    }

    opportunity.lastDate = lastDate ?? opportunity.lastDate;
    opportunity.skillsRequired =
      skillsRequired ?? opportunity.skillsRequired;
    opportunity.eligibility = eligibility ?? opportunity.eligibility;

    if (isPaid !== undefined) {
      opportunity.isPaid = Boolean(isPaid);
    }

    opportunity.status = status ?? opportunity.status;
    opportunity.postedOn = postedOn ?? opportunity.postedOn;

    await opportunity.save();

    res.status(200).json({
      success: true,
      message: "Opportunity updated successfully",
      opportunity: opportunity,
    });
  } catch (error) {
    console.error("Update Opportunity Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update opportunity",
    });
  }
};

// ======================================
// Delete Opportunity
// ======================================

const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    await Opportunity.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete Opportunity Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete opportunity",
    });
  }
};

// ======================================
// Export
// ======================================

module.exports = {
  getAllOpportunities,
  getOpenOpportunities,
  getTopCompanies,
  getOpportunitiesByCompany,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
};