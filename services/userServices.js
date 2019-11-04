const collection = require('../database');

module.exports.createUser = userToCreate => {
    try {
        collection.user.insertOne(userToCreate);

        console.log(userToCreate);
    
    } catch (e) {
        throw new Error (`Registration error`);
    }
};

module.exports.userAuth =  async userToAuth => {
    try {
        const result = await collection.user.findOne( {
                email: `${userToAuth.email}`,
                password: `${userToAuth.password}`
            }, (err, result) => {
                
            
                return result;
            })
         
            if (result) {
                let token = jwt.sign({
                    username: email
                },
                    config.secret, { 
                        expiresIn: '24h' // expires in 24 hours
                        }
                );
                return token;
            } 
            return ('');

    } catch (e) {
        throw new Error ('Error, user is undefinded');
        }
};