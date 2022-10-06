const router = require('express').Router();
const {
    addTool,
    removeTool,
    addNote,
    removeNote
} = require('../../controllers/tool-controller');

router.route('/:toolId').post(addTool);

router
    .route('/:toolId/:noteId')
    .put(addNote)
    .delete(removeTool)

router.route('/:userId/:toolId/:noteId').delete(removeNote);

module.exports = router;