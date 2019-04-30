import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class TradeService {
  async get() {
    let res = await axios.get(ApiRoutes.TRADES);
    return res.data;
  }

  async fetch(errorCallback, successCallback) {
    try {
      let res = await axios.get(ApiRoutes.TRADES);
      const stat = res.data.status;
      let trades = [];
      if (stat) {
        res.data.data.trades.forEach((item, i) => {
          let trade = {
            value: item.id,
            label: item.fla ? item.name + " (required Food License Authority Certificate)" : item.name,
            fla: item.fla
          };
          trades.push(trade);
        });
       successCallback(trades)
      } else {
        errorCallback("Something went wrong: Please try again later");
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }

}

export const fetchTrades = async () => {
  return await axios.get(ApiRoutes.TRADES);
};