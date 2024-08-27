import dbConnection from "../db/db"
import Billable from "../models/billableSchema.js";

// Helper function to get actuals by Id
const getBillableByIdFromDB = async (billableId) => {
    const [result] = await dbConnection.promise().query(`SELECT * FROM billageble WHERE id = ?`,
        [billableId]
    );
    return result;
};


// Helper function to validate billagable data
const validateBillagebleData = (data) => {
    const requiredFields = ['division', 'name', 'labourBurden', 'billableRate'];

    for (const x of requiredFields) {
        if (!data[x]) {
            return `Field ${x} is required`;
        }
    }
    return null;
};


// // to create billageble 
// export const billageble_create = async (req, res) => {
//     try {
//         const { division, name, labourBurden, billableRate } = req.body;

//         const validationError = validateBillagebleData(req.body);

//         if (validationError) {
//             return res.status(400).json({ message: validationError });
//         };

//         const [billagableRow] = await dbConnection.promise().query(
//             `INSERT INTO billable (
//                 division, name, labourBurden, billableRate
//             ) VALUES (?, ?, ?, ?)`,
//              [division, name, labourBurden, billableRate]
//         );

//         res.status(200).json({
//             message: "Successfully added billagable details",
//             data: { id: billagableRow.insertId, ...req.body }
//         })
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create billagable details', error: error.message });
//     }
// };



// export const billagable_update = async (req, res) => {
//     try {
//         const billableId = req.params.id;

//         const { division, name, labourBurden, billableRate } = req.body;

//         // checking billagable row exist or not
//         const IsExistingBill = await getBillableByIdFromDB(billableId);

//         if (IsExistingBill.length === 0) {
//             return res.status(404).json({ message: "Billagable row not found" })
//         };

//         const validationError = validateBillagebleData(req.body);

//         if (validationError) {
//             return res.status(400).json({ message: validationError })
//         };

//         const [upddatedRow] = await dbConnection.promise().query(
//             `UPDATE billageble SET
//                 division = ?, name = ?, labourBurden = ?, billableRate = ?
//             WHERE id = ?
//             `,
//             [division, name, labourBurden, billableRate]
//         );

//         if (upddatedRow.affectedRows === 0) {
//             return res.status(400)
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const billagable_delete = async (req, res) => {
//     try {
//         const billableId = req.params.id;
//         const [result] = await dbConnection.promise().query(`DELETE FROM billageble WHERE id = ?`, [billableId]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Billagable's Row not found" });
//         };

//         res.status(200).json({ message: "Billagable row deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const getAllBillagable = async (req, res) => {
//     try {
//         const [allbillagable] = await dbConnection.promise().query(`SELECT * FROM billageble ORDER BY name DESC`);

//         res.status(200).json({
//             message: "All billageble details fetched",
//             success: true,
//             data: allbillagable
//         })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const getBillagableById = async (req, res) => {
//     try {
//         const billableId = req.params.id;

//         // checking Billagable Database exist or not
//         const actualsById = await getBillableByIdFromDB(billableId);

//         if (actualsById.length === 0) {
//             return res.status(404).json({ message: "Billageble's row not found" });
//         };

//         res.status(200).json({
//             message: "Billagable details fetched",
//             success: true,
//             data: actualId
//         })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }








export const billable_create = async (req, res) => {
    try {
        const { division, name, labourBurden, billableRate } = req.body;

        const validationError = validateBillagebleData(req.body);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        };

        const newBillable = await Billable.create({
            division,
            name,
            labourBurden,
            billableRate
        });

        res.status(200).json({
            message: "Successfully added billable details",
            data: newBillable
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create billable details', error: error.message });
    }
};





export const billable_update = async (req, res) => {
    try {
        const billableId = req.params.id;
        const { division, name, labourBurden, billableRate } = req.body;

        const billable = await Billable.findByPk(billableId);

        if (!billable) {
            return res.status(404).json({ message: "Billable row not found" });
        }

        const validationError = validateBillagebleData(req.body);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        };

        await billable.update({ division, name, labourBurden, billableRate });

        res.status(200).json({
            message: "Billable details updated successfully",
            data: billable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const billable_delete = async (req, res) => {
    try {
        const billableId = req.params.id;
        const billable = await Billable.findByPk(billableId);

        if (!billable) {
            return res.status(404).json({ message: "Billable row not found" });
        }

        await billable.destroy();

        res.status(200).json({ message: "Billable row deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getAllBillable = async (req, res) => {
    try {
        const allBillables = await Billable.findAll({ order: [['name', 'DESC']] });

        res.status(200).json({
            message: "All billable details fetched",
            success: true,
            data: allBillables
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getBillableById = async (req, res) => {
    try {
        const billableId = req.params.id;

        const billable = await Billable.findByPk(billableId);

        if (!billable) {
            return res.status(404).json({ message: "Billable's row not found" });
        }

        res.status(200).json({
            message: "Billable details fetched",
            success: true,
            data: billable
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
