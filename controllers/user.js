const {userServices} = require('../services');


module.exports.createUser = (req,res) => {
    try {
        const user = req.body; 
        userServices.createUser(user);

        res.redirect('/auth');
    } catch (e) {
        res.status(400).json(e.message);
    }   
}

module.exports.userAuth = async (req,res) => {
    try {
        const userToAuth = req.body;
       const token = await userServices.userAuth(userToAuth);

        // res.cookie('accessToken', token);
       
        // res.header('Authorization', token);
        res.redirect('/tasks');

    } catch (e) {
            res.status(400).json(e.message);
    }
}

