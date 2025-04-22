const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Put specific routes BEFORE parameterized routes
router.get('/create', blogController.blog_create_get);
router.get('/search', blogController.blog_search);  // This must come before :id
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);
router.get('/:id/edit', blogController.blog_edit_get);
router.put('/:id', blogController.blog_edit_put);

module.exports = router;