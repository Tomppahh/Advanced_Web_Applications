"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = __importDefault(require("./src/routes/book"));
const cors_1 = __importDefault(require("cors"));
// Dotenv config
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT) || 3001;
// CORS
if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    };
    app.use((0, cors_1.default)(corsOptions));
}
// Settings
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/data', express_1.default.static(path_1.default.join(__dirname, '../data')));
// Routes
app.use(book_1.default);
// MongoDB connection
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';
mongoose_1.default
    .connect(mongoDB)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
