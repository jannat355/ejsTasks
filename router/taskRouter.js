const express = require('express');
const router = express.Router();
const Tasks = require('../model/taskModel');
const { create_task ,delete_task,single_page, edit_task} = require('../controller/taskController');

// post route
router.post('/create',create_task);
// single
router.get('/route/:id',single_page)

//delete route D -- delete
router.get('/delete/:id',delete_task )
router.get('/edit/:id',edit_task )


 module.exports = router;