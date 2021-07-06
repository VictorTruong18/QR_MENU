const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
    if(req.session && req.session.userId) {
      res.status(200).send({
          "session" : req.session
      })
      next();
    } else {
      res.status(403).send({
        errorMessage: 'You must be logged in.'
      });
    }
};

router.get('/header', authMiddleware, (req,res) => {})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err){
            res.status(406).send()
        }
        console.log("hello")
        res.clearCookie(`${process.env.SESSION_NAME}`)
    })
})



module.exports = router;