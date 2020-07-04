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

// Get User ID By Email
router.get("/byEmail", (req, res) => {
  admin.auth().getUserByEmail(req.body.email)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully fetched user data:', userRecord.toJSON());
      return res.send({
        success: true,
        message: ('Successfully fetched user data:', userRecord.toJSON())
      });
    })
    .catch(function (error) {
      console.log('Error fetching user data:', error);
      return res.send({
        success: false,
        message: ('Error fetching user data:', error.message)
      });
    });
});

// Get User ID By Phone
router.get("/byPhone", (req, res) => {
  admin.auth().getUserByPhoneNumber(req.body.phoneNumber)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully fetched user data:', userRecord.toJSON());
      return res.send({
        success: true,
        message: ('Successfully fetched user data:', userRecord.toJSON())
      });
    })
    .catch(function (error) {
      console.log('Error fetching user data:', error);
      return res.send({
        success: false,
        message: ('Error fetched user data:', error.message)
      });
    });
});

// Delete User By ID
router.delete("/:id", (req, res) => {
  admin.auth().deleteUser(req.params.id)
    .then(function () {
      console.log('Successfully deleted user');
      return res.send({
        success: true,
        message: ('Successfully deleted user')
      });
    })
    .catch(function (error) {
      console.log('Error deleting user:', error);
      return res.send({
        success: false,
        message: ('Error deleting user:', error.message)
      });
    });
});

// Create Custom Token
router.get("/token/:id", (req, res) => {
  admin.auth().createCustomToken(req.params.id)
    .then(function (customToken) {
      // Send token back to client
      console.log(customToken);
      return res.send({
        success: true,
        message: 'Successfully created custom token'
      });
    })
    .catch(function (error) {
      console.log('Error creating custom token:', error);
      return res.send({
        success: false,
        message: ('Error creating custom token:', error.message)
      });
    });
});

// Verify Id Token
router.get("/verifyToken", (req, res) => {
  console.log(req.body.idToken);
  admin.auth().verifyIdToken(req.body.idToken)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      console.log(uid);
      return res.send({
        success: true,
        message: ('Verified token', uid)
      });
    }).catch(function (error) {
      console.log('Error verifying token:', error);
      return res.send({
        success: false,
        message: ('Error verifying token:', error.message)
      });
    });
});

module.exports = router;