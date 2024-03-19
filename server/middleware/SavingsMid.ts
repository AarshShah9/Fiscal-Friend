import { SavingsModel } from '../models/SavingsModel';
require('dotenv').config('../.env');

export class SavingsMid {
  async getSavings() {
    const savings = await SavingsModel.find({});
    return savings;
  }

  async createSavings(savings) {
    let data = {};
    try {
      data = await SavingsModel.create(savings);
    } catch (e) {
      //console log error here
    }
    return data;
  }

  async updateSavings(savings) {
    let data = {};
    try {
      data = await SavingsModel.updateOne(savings);
    } catch (e) {
      //console log error here
    }
    return data;
  }

  async deleteSavings(savingsId) {
    let data: any = {};
    try {
      data = await SavingsModel.deleteOne({ _id: savingsId });
    } catch (e) {
      // console log error here
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}
