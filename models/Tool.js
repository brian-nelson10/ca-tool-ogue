const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const NoteSchema = new Schema (
    {
        noteId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        noteText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 2
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true,
            maxLength: 20,
            minLength: 2
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ToolSchema = new Schema (
    {
        toolName: {
            type: String,
            required: true,
            minLength: 2
        },
        checkedOutAt: {
            type: Date,
            default: Date.now,
            get: checkedOutAtVal => dateFormat(checkedOutAtVal)
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        notes: [NoteSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



ToolSchema.virtual('noteCount').get(function() {
    return this.notes.length;
});

const Tool = model('Tool', ToolSchema)

module.exports = Tool;