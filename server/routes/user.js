const express = require('express');
const router = express.Router();

const {login , signup} = require('../controllers/auth')
const { auth , isStudent, isAdmin} = require('../middleware/auth')

router.post('/login' , login);
router.post('/signup' , signup);

// test
router.get('/test', auth , (req, res) => {
    res.json({
        success:true,
        message:'welcome to the test service'
    })
})

// procted routes
router.get('/student', auth , isStudent , (req , res) => { 
        res.json({
            success:true,
            message:'welcome to the student service'
        })
});

router.get('/admin' , auth , isAdmin) , (req ,res) => {
    res.json({
        success:true,
        message:'welcome to the admin service'
    })
}

module.exports = router