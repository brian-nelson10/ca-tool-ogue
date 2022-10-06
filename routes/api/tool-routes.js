const router = require('express').Router();
const {
    getAllTool,
    createTool,
    removeTool,
    deleteTool,
    addNote,
    removeNote
} = require('../../controllers/tool-controller');

router
    .route('/')
    .get(getAllTool)
    .post(createTool)

router
.route('/:toolId')
.post(createTool)
.delete(deleteTool)

router
    .route('/:toolId/:noteId')
    .put(addNote)

router
.route('/:userId/:toolId/:noteId')
.delete(removeNote)

router
.route('/:userId/:toolId')
.delete(removeTool)

module.exports = router;
