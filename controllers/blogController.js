const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { 
        blogs: result, 
        title: 'All blogs',
        searchTerm: '' // Initialize empty search term
      });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

// NEW: Edit/Update Functions
const blog_edit_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(blog => {
      res.render('edit', { blog: blog, title: 'Edit Blog' });
    })
    .catch(err => {
      console.log(err);
      res.render('404');
    });
};

const blog_edit_put = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then(result => {
      res.redirect(`/blogs/${id}`);
    })
    .catch(err => {
      console.log(err);
      res.render('404');
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_search = (req, res) => {
  const searchTerm = req.query.term;
  
  // If empty search, redirect to all blogs
  if (!searchTerm || searchTerm.trim() === '') {
    return res.redirect('/blogs');
  }

  Blog.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { body: { $regex: searchTerm, $options: 'i' } }
    ]
  })
  .sort({ createdAt: -1 })
  .then(results => {
    res.render('index', {
      blogs: results,
      title: 'Search Results',
      searchTerm: searchTerm
    });
  })
  .catch(err => {
    console.log(err);
    res.render('404');
  });
};

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post,
  blog_edit_get, 
  blog_edit_put,  
  blog_delete,
  blog_search
};