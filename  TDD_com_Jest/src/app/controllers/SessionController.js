const { User } = require('../models')

class SessionController {
    static async store(req, res) {
        const { email, password } = req.body
        
        console.log(email)

        const user = await User.findOne({ where: { email }})

        if(!user) {
            return res.status(401).json({ message: 'User not found'})
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({ message: 'Incorret password'})
        }

        return res.json({
            user,
            token: user.generateToken()
         })
    }
}

module.exports = SessionController