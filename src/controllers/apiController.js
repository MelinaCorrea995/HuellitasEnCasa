const db = require('../database/models');
const toggleValidateUser = async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed'
        });
    }
    // Verifica si el usuario existe
    const user = await db.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    
    user.validated = !user.validated;
    
    await user.save();
    
    return res.status(200).json({
        success: true,
        message: 'User validated successfully'
    });
};

const toggleAdminUser = async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed'
        });
    }
    // Verifica si el usuario existe
    const user = await db.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    user.roleId = user.roleId === 1 ? 2 : 1;

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'User validated successfully'
    })
}


module.exports = {
    toggleValidateUser,
    toggleAdminUser
}