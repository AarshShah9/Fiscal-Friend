'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const conn_1 = require('./db/conn');
const dotenv_1 = __importDefault(require('dotenv'));
const user_routes_1 = __importDefault(require('./routes/user.routes'));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10) || 4000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server!!');
});
app.use('/api/user', user_routes_1.default);
(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, conn_1.connectToDatabase)();
      console.log('Database connection established, starting server...');
      app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }))();
