// import dbConnection from "../db/db.js";


// export const budgetCreate = async (req, res) => {
//     try {
//         const {
//             year,
//             month,
//             titleA,
//             titleB,
//             titleC,
//             titleD,
//             titleE,
//             titleF,
//             titleG,
//             titleH,
//             total_income,
//             budget_income,
//             status: budgetStatus,
//             file_name
//         } = req.body;
//         if (!year || !month || !titleA || !titleB || !titleC || !titleD || !titleE || !titleF || !titleG || !titleH || !total_income || !budget_income || !budgetStatus || !file_name) {
//             res.status(400).json({
//                 message: "Please fill all fields"
//             })
//         };
//         const [budgetRow] = await dbConnection.promise().query(
//             `INSERT INTO budget (
//                 year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, budgetStatus, file_name
//             ]
//         );
//         res.status(201).json({
//             message: "Successfully Added budget details",
//             data: {
//                 id: budgetRow.insertId,
//                 ...req.body
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create budget' });
//     }
// };


// export const budgetUpdate = async (req, res) => {
//     try {
//         const budgetId = req.params.id;
//         console.log("Budget ID", budgetId);
//         const {
//             year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH,
//             total_income, budget_income, status, file_name
//         } = req.body;
//         const [existingBudget] = await dbConnection.promise().query(
//             `SELECT * FROM budget WHERE id = ?`,
//             [budgetId]
//         );
//         if (existingBudget.length === 0) {
//             return res.status(404).json({ message: "Budget Row not found" });
//         }
//         const [updateBudget] = await dbConnection.promise().query(
//             `UPDATE budget SET 
//                 year = ?, 
//                 month = ?, 
//                 titleA = ?, 
//                 titleB = ?, 
//                 titleC = ?, 
//                 titleD = ?, 
//                 titleE = ?, 
//                 titleF = ?, 
//                 titleG = ?, 
//                 titleH = ?, 
//                 total_income = ?, 
//                 budget_income = ?, 
//                 status = ?, 
//                 file_name = ? 
//             WHERE id = ?`,
//             [
//                 year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH,
//                 total_income, budget_income, status, file_name, budgetId
//             ]
//         );
//         if (updateBudget.affectedRows === 0) {
//             return res.status(404).json({ message: "Budget row not found" });
//         }
//         res.status(200).json({
//             message: "Budget row updated",
//             updatedBudgetData: {
//                 id: budgetId,
//                 ...req.body
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };





// export const budgetDeleteById = async (req, res) => {
//     try {
//         const budgetId = req.params.id;
//         console.log("Budget ID", budgetId)

//         const [deletedBudget] = await dbConnection.promise().query(
//             `DELETE FROM budget WHERE id = ?`,
//             [budgetId]
//         );

//         if (deletedBudget.affectedRows === 0) {
//             return res.status(400).json({
//                 message: "Budget Row not found"
//             })
//         };

//         res.status(200).json({
//             message: `Budget Row Deleted Successfully`
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// };




// export const getAllBudget = async (req, res) => {
//     try {
//         const [allBudget] = await dbConnection.promise().query(
//             `SELECT * FROM budget ORDER BY created_at DESC`
//         );

//         res.status(200).json({
//             message: "All Budget Details fetched",
//             success: true,
//             data: allBudget
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }




// export const getBudgetById = async (req, res) => {

//     const budgetId = req.params.id;
//     console.log("Budget ID", budgetId)

//     try {
//         const [BudgetById] = await dbConnection.promise().query(
//             `SELECT * FROM budget WHERE id = ?`,
//             [budgetId]
//         );

//         res.status(200).json({
//             message: "Budget Details fetched",
//             success: true,
//             data: BudgetById
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }




































import dbConnection from "../db/db.js";

// Helper function to get budget by ID
const getBudgetByIdFromDB = async (budgetId) => {
    const [result] = await dbConnection.promise().query(`SELECT * FROM budget WHERE id = ?`, [budgetId]);
    return result;
};

// Helper function to validate budget data
const validateBudgetData = (data) => {
    const requiredFields = ['year', 'month', 'titleA', 'titleB', 'titleC', 'titleD', 'titleE', 'titleF', 'titleG', 'titleH', 'total_income', 'budget_income', 'status', 'file_name'];
    for (const x of requiredFields) {
        if (!data[x]) {
            return `Field ${x} is required`;
        }
    }
    return null;
};

// Create budget
export const budgetCreate = async (req, res) => {
    try {
        const validationError = validateBudgetData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const { year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name } = req.body;
        const [result] = await dbConnection.promise().query(
            `INSERT INTO budget (
                year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name]
        );

        res.status(201).json({
            message: "Successfully added budget details",
            data: { id: result.insertId, ...req.body }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create budget', error: error.message });
    }
};

// Update budget
export const budgetUpdate = async (req, res) => {
    try {
        const budgetId = req.params.id;
        const existingBudget = await getBudgetByIdFromDB(budgetId);
        
        if (existingBudget.length === 0) {
            return res.status(404).json({ message: "Budget row not found" });
        }

        const validationError = validateBudgetData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const { year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name } = req.body;
        const [result] = await dbConnection.promise().query(
            `UPDATE budget SET 
                year = ?, month = ?, titleA = ?, titleB = ?, titleC = ?, titleD = ?, titleE = ?, titleF = ?, titleG = ?, titleH = ?, 
                total_income = ?, budget_income = ?, status = ?, file_name = ? 
            WHERE id = ?`,
            [year, month, titleA, titleB, titleC, titleD, titleE, titleF, titleG, titleH, total_income, budget_income, status, file_name, budgetId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Budget row not found" });
        }

        res.status(200).json({
            message: "Budget row updated",
            updatedBudgetData: { id: budgetId, ...req.body }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete budget by ID
export const budgetDeleteById = async (req, res) => {
    try {
        const budgetId = req.params.id;
        const [result] = await dbConnection.promise().query(`DELETE FROM budget WHERE id = ?`, [budgetId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Budget row not found" });
        }

        res.status(200).json({ message: "Budget row deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all budgets
export const getAllBudget = async (req, res) => {
    try {
        const [allBudget] = await dbConnection.promise().query(`SELECT * FROM budget ORDER BY created_at DESC`);
        res.status(200).json({
            message: "All budget details fetched",
            success: true,
            data: allBudget
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get budget by ID
export const getBudgetById = async (req, res) => {
    try {
        const budgetId = req.params.id;
        const budgetById = await getBudgetByIdFromDB(budgetId);

        if (budgetById.length === 0) {
            return res.status(404).json({ message: "Budget row not found" });
        }

        res.status(200).json({
            message: "Budget details fetched",
            success: true,
            data: budgetById
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
