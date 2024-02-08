"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Assuming MONGO_URI is a string, adjust as necessary for your environment
let MONGO_URI = process.env.ATLAS_URI;
MONGO_URI = "mongodb+srv://allaccess:8lbtpYuPmMAAzOmj@fiscalfriendfirst.envrqpu.mongodb.net/?retryWrites=true&w=majority";
let connectionInstance = null;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (connectionInstance) {
        console.log('Using existing database connection');
        return connectionInstance;
    }
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('Database Connected Successfully');
        connectionInstance = mongoose_1.default.connection;
        return connectionInstance;
    }
    catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
