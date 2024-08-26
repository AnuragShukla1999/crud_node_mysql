import dbConnection from "../db/db";

// Helper function to get budget by ID
const getActualByIdFromDB = async (actualId) => {
    const [result] = await dbConnection.promise().query(`SELECT * FROM actuals WHERE id = ?`, [actualId]);
    return result;
};

// Helper function to validate actuals data
const validateActualData = (data) => {
    const requiredFields = ['project_id', 'actuals_pm', 'qb_project_name', 'month', 'year', 'created_at', 'file_name', 'poc', 'others', 'status'];
    for (const x of requiredFields) {
        if (!data[x]) {
            return `Field ${x} is required`;
        }
    }
    return null;
};

export const actual_create = async (req, res) => {
    try {
        const {
            project_id, actuals_pm, qb_project_name, month, year, created_at, file_name, poc, others, status
        } = req.body;
    
        const validationError = validateActualData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        };
    
        const [actualRow] = await dbConnection.promise().query(
            `INSERT INTO actuals (
                project_id, actuals_pm, qb_project_name, month, year, created_at, file_name, poc,
                others, status,
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [project_id, actuals_pm, qb_project_name, month, year, created_at, file_name, poc, others, status]
        );
    
        res.status(200).json({
            message: "Successfully added actuals details",
            data: { id: actualRow.insertId, ...req.body }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create actuals details', error: error.message });
    }
};



export const actual_update = async (req, res) => {
    try {
        const actualId = req.params.id;

        // checking actuals row exist or not
        const IsexistingActual = await getActualByIdFromDB(actualId);

        if (IsexistingActual.length === 0) {
            return res.status(404).json({ message: "Actuals row not found" })
        }

        const validationError = validateActualData(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError })
        }

        const {
            project_id, actuals_pm, qb_project_name, month, year, created_at, file_name, poc, others, status
        } = req.body;

        const [upddatedRow] = await dbConnection.promise().query(
            `UPDATE actuals SET
                project_id = ?, actuals_pm = ?, qb_project_name = ?, month = ?, year = ?, created_at = ?, file_name = ?, poc = ?, others = ?, status = ?
            WHERE id = ?`,
            [project_id, actuals_pm, qb_project_name, month, year, created_at, file_name, poc, others, status]
        );

        if (upddatedRow.affectedRows === 0) {
            return res.status(404).json({ message: "Actuals's row not found" });
        }

        res.status(200).json({
            message: "Budget row updated",
            upddatedActualData: { id : actualId, ...req.body }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Delete Actual by Id
export const actualsDeleteById = async (req, res) => {
    try {
        const actualId = req.params.id;
        const [result] = await dbConnection.promise().query(`DELETE FROM actuals WHERE id = ?`, [actualId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Acutals's Row not found" });
        };

        res.status(200).json({ message: "Budget row deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get All Actuals
export const getAllActuals = async (req, res) => {
    try {
        const [allActuals] = await dbConnection.promise().query(`SELECT * FROM actuals ORDER BY created_at DESC`);

        res.status(200).json({
            message: "All Actuals details fetched",
            success: true,
            data: allActuals
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get budget by Id
export const getActualsById = async (req, res) => {
    try {
        const actualId = req.params.id;

        // checking Actuals Database exist or not
        const actualsById = await getActualByIdFromDB(actualId)

        if (actualsById.length === 0) {
            return res.status(404).json({ message: "Actuals's row not found" });
        };

        res.status(200).json({
            message: "Actuals details fetched",
            success: true,
            data: actualId
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}