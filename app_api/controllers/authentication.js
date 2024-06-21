const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message": "All fields required"});
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.setPassword(req.body.password);

    user.membershipID = await generateUniqueMembershipID();

    user.save()
    .then(savedUser => {
        const token = savedUser.generateJwt();
        res.status(200).json({ token });
    })
    .catch(error => {
        res.status(400).json({ error: error.message || 'An error occurred while saving the user.' });
    });
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message": "All fields required."});
    }
    
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
            .status(404)
            .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
            .status(200)
            .json({token});
        } else {
            res
            .status(401)
            .json(info);
        }
    })(req, res);
};

async function generateUniqueMembershipID() {
    let unique = false;
    let membershipID;
  
    while (!unique) {
      // Generate a new 12-digit membership ID
      membershipID = generateMembershipID();
      
      // Check if the generated ID is unique
      const existingUser = await User.findOne({ membershipID });
      
      if (!existingUser) {
        unique = true;
      }
    }
  
    return membershipID;
};
  
// Function to generate a random 12-digit membership ID
 function generateMembershipID() {
    let membershipID = '';
    for (let i = 0; i < 12; i++) {
      membershipID += Math.floor(Math.random() * 10);
    }
    return membershipID;
};
  

module.exports = {
    register,
    login
};