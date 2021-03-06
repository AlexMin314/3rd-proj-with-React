// Import dependencies
import express from 'express';
import passport from 'passport';

// Import router
const router = express.Router();

/**
 * Controllers, configs
 */
import passportConfig from '../config/passport';

// get user login status.
router.get('/user', (req, res, next) => {
  res.json(req.user);
});

/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
  successRedirect: '/home'
}));

router.get('/google', passport.authenticate('google', {scope: 'profile email'}));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/home'
}));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/',
  successRedirect: '/home'
}));

// Export router for shared access
module.exports = router;
