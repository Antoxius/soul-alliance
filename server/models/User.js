import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't return password by default
    },
    playerData: {
        displayName: {
            type: String,
            default: function() { return this.username; }
        },
        rank: {
            type: String,
            enum: ['R2', 'R3', 'R4', 'R5'],
            default: 'R2'
        },
        level: {
            type: Number,
            default: 1,
            min: 1
        },
        experience: {
            type: Number,
            default: 0,
            min: 0
        },
        avatar: {
            type: String,
            default: 'https://ui-avatars.com/api/?background=random'
        },
        stats: {
            gamesPlayed: { type: Number, default: 0 },
            wins: { type: Number, default: 0 },
            losses: { type: Number, default: 0 },
            kills: { type: Number, default: 0 },
            deaths: { type: Number, default: 0 }
        },
        achievements: [{
            name: String,
            description: String,
            unlockedAt: Date
        }],
        inventory: [{
            itemName: String,
            itemType: String,
            quantity: { type: Number, default: 1 },
            acquiredAt: { type: Date, default: Date.now }
        }],
        preferences: {
            theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
            notifications: { type: Boolean, default: true },
            privacy: { type: String, enum: ['public', 'friends', 'private'], default: 'public' }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        playerData: this.playerData,
        lastLogin: this.lastLogin,
        createdAt: this.createdAt
    };
};

const User = mongoose.model('User', userSchema);

export default User;
