const { Tool, User } = require('../models');

const toolController = {
    getAllTool(req, res) {
    // add tool to user i need to add a store model and store the tool in store not user
    Tool.find({})
        .populate({
            path: 'tools',
            select: '-__v'
        })
            .select('-__v')
            .sort({_id:-1})
            .then(dbToolData => res.json(dbToolData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
      },

      createTool({ body }, res) {
        Tool.create(body)
        .then(dbToolData => res.json(dbToolData))
        .catch(err => res.status(400).json(err));
    },

    deleteTool({ params }, res) {
        Tool.findOneAndDelete({ _id: params.id })
         .then(dbToolData => {
            if (!dbToolData) {
                res.status(404).json({ message: 'No Tool found with this id!!!' });
                return;
            }
            res.json(dbToolData);
         })
         .catch(err => res.status(400).json(err));
    },

      addNote({ params, body }, res) {
        Tool.findOneAndUpdate(
          { _id: params.toolId },
          { $push: { notes: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
        },

 // remove note
removeNote({ params }, res) {
    Tool.findOneAndUpdate(
      { _id: params.toolId },
      { $pull: { notes: { replyId: params.noteId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // remove tool from user
  removeTool({ params }, res) {
    Tool.findOneAndUpdate({ _id: params.toolId })
      .then(removedTool => {
        if (!removedTool) {
          return res.status(404).json({ message: 'No TOOL with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { tools: params.toolId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = toolController;