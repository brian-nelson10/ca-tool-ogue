const { Tool, User } = require('../models');

const toolController = {
    // add tool to user
    addTool({ params, body }, res) {
        console.log(body);
        Tool.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { tools: _id } },
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

  // remove tool
  removeTool({ params }, res) {
    Tool.findOneAndDelete({ _id: params.toolId })
      .then(deletedTool => {
        if (!deletedTool) {
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