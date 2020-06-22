import express from "express";
import * as admin from 'firebase-admin'
import serviceAccountKey from '../serviceAccountKey.json'

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// Create User
router.post("/create", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const {
    first_name,
    last_name,
    email,
    password,
    phoneNumber
  } = body;
  admin.auth().createUser({
    email: email,
    emailVerified: false,
    phoneNumber: phoneNumber,
    password: password,
    displayName: first_name + last_name,
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      return res.send({
        success: true,
        message: ('Successfully created new user:', userRecord.uid)
      });
    })
    .catch(function (error) {
      console.log('Error creating new user:', error);
      return res.send({
        success: false,
        message: ('Error creating new user:', error.message)
      });
    });
});

module.exports = router;