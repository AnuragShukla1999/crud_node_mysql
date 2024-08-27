import dbConnection from "../db/db"

// Helper function to get actuals by Id
const get_billableAndUnbillableArchive_ByIdFromDB = async (billableAndUnbillableArchive_Id) => {
    const [result] = await dbConnection.promise().query(`SELECT * FROM billableAndUnbillableArchive WHERE id = ?`,
        [billableAndUnbillableArchive_Id]
    );
    return result;
};


// Helper function to validate billagable data
const validate_billableAndUnbillableArchive_Data = (data) => {
    const requiredFields = ['year', 'month', 'payPeriodStartDate', 'payPeriodEndDate', 'billableTime', 'unBillableTime', 'vacatiomStatTime', 'eosTime', 'salesTime', 'sickTime', 'totalHours', 'fileName', 'create_at', 'modify_at', 'create_by', 'role_id', 'modify_by', 'division', 'name', 'labourBurden', 'billableRate'];

    for (const x of requiredFields) {
        if (!data[x]) {
            return `Field ${x} is required`;
        }
    }
    return null;
};


// to create billageble 
export const billableAndUnbillableArchive_create = async (req, res) => {
    try {
        const { year, month, payPeriodStartDate, payPeriodEndDate,  billableTime, unBillableTime, vacatiomStatTime, eosTime,  salesTime, sickTime, totalHours, fileName,  create_at, modify_at, create_by, modify_by, division, name, labourBurden,  billableRate } = req.body;

        // check all feild is filled or not
        const validationError = validate_billableAndUnbillableArchive_Data(req.body);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        };

        const [billableAndUnbillableArchive_Row] = await dbConnection.promise().query(
            `INSERT INTO billableAndUnbillableArchive (
                year, month, payPeriodStartDate, payPeriodEndDate,  billableTime, unBillableTime, vacatiomStatTime, eosTime,  salesTime, sickTime, totalHours, fileName,  create_at, modify_at, create_by, role_id,  modify_by, division, name, labourBurden,  billableRate
            ) VALUES (?, ?, ?, ?)`,
             [year, month, payPeriodStartDate, payPeriodEndDate,  billableTime, unBillableTime, vacatiomStatTime, eosTime,  salesTime, sickTime, totalHours, fileName,  create_at, modify_at, create_by, role_id,  modify_by, division, name, labourBurden,  billableRate]
        );

        res.status(200).json({
            message: "Successfully added billableAndUnbillableArchive details",
            data: { id: billableAndUnbillableArchive_Row.insertId, ...req.body }
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create billableAndUnbillableArchive details', error: error.message });
    }
};



export const billableAndUnbillable_update = async (req, res) => {
    try {
        const billable_unbillagble_Id = req.params.id;

        const { year, month, payPeriodStartDate, payPeriodEndDate,  billableTime, unBillableTime, vacatiomStatTime, eosTime,  salesTime, sickTime, totalHours, fileName,  create_at, modify_at, create_by, role_id,  modify_by, division, name, labourBurden,  billableRate } = req.body;

        // checking billableAndUnbillable row exist or not
        const IsExistingBillableAndUnbillable = await get_billableAndUnbillable_ByIdFromDB(billable_unbillagble_Id);

        if (IsExistingBillableAndUnbillable.length === 0) {
            return res.status(404).json({ message: "billableAndUnbillable row not found" })
        };

        const validationError = validate_billableAndUnbillableArchive_Data(req.body);

        if (validationError) {
            return res.status(400).json({ message: validationError })
        };

        const [upddatedRow] = await dbConnection.promise().query(
            `UPDATE billableAndUnbillable SET
                year = ?, month = ?, payPeriodStartDate = ?, payPeriodEndDate = ?, billableTime = ?, unBillableTime = ?, vacatiomStatTime = ?, eosTime = ?, salesTime = ?, sickTime = ?, totalHours = ?, fileName = ?, create_at = ?, modify_at = ?, create_by = ?, role_id = ?, modify_by = ?, division = ?, name = ?, labourBurden = ?, billableRate = ? 
            WHERE id = ?
            `,
            [year, month, payPeriodStartDate, payPeriodEndDate,  billableTime, unBillableTime, vacatiomStatTime, eosTime,  salesTime, sickTime, totalHours, fileName,  create_at, modify_at, create_by, role_id,  modify_by, division, name, labourBurden,  billableRate]
        );

        if (upddatedRow.affectedRows === 0) {
            return res.status(400)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const billableAndUnbillable_delete = async (req, res) => {
    try {
        const billable_unbillagble_Id = req.params.id;
        const [result] = await dbConnection.promise().query(`DELETE FROM billableAndUnbillable WHERE id = ?`, [billable_unbillagble_Id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "billableAndUnbillable's Row not found" });
        };

        res.status(200).json({ message: "billableAndUnbillable row deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllBillableAndUnbillable = async (req, res) => {
    try {
        const [allbillableAndUnbillable] = await dbConnection.promise().query(`SELECT * FROM billableAndUnbillable ORDER BY name DESC`);

        res.status(200).json({
            message: "All billableAndUnbillable details fetched",
            success: true,
            data: allbillableAndUnbillable
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBillableAndUnbillableById = async (req, res) => {
    try {
        const billable_unbillagble_Id = req.params.id;

        // checking Billagable Database exist or not
        const billableAndUnbillable_ById = await get_billableAndUnbillable_ByIdFromDB(billable_unbillagble_Id);

        if (billableAndUnbillable_ById.length === 0) {
            return res.status(404).json({ message: "billableAndUnbillable's row not found" });
        };

        res.status(200).json({
            message: "billableAndUnbillable details fetched",
            success: true,
            data: actualId
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}