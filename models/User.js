const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
            required: [true, "Email required"]
    },
    tools: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tool'
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tool'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
// });

const User = model('User', UserSchema);

module.exports = User;