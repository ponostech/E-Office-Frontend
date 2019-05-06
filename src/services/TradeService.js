import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";
import moment from "moment";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";

export class TradeService {
  async all(errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };

    try {
      let res = await axios.get(ApiRoutes.GET_TRADE, config);

      if (res.data.status) {
        successCallback(res.data.data.trades)
      } else {
        errorCallback("Something went wrong: Please try again later")
      }
    } catch (e) {
      console.error(e);
      errorCallback(e.toString())
    }

  }

  async create(state, errorCallback, successCallback) {
    const token = localStorage.getItem("access_token");
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    let data = {
      name: state.name,
      rate: state.rate,
      fla: state.fla.value,
    };
    try {
      let res = await axios.post(ApiRoutes.CREATE_TRADE, data);
      console.log(res);
      if (res.data.status) {
        let msg = ArrayToString(res.data.messages);
        successCallback(msg);
      } else {
        errorCallback(ErrorToString(res.data.messages));
      }
    } catch (e) {
      errorCallback(e.toString());
    }
  }
  async fetch(errorCallback, successCallback) {
    // const token = localStorage.getItem("access_token");
    // const config={ headers: {"Authorization" : `Bearer ${token}`} }
    try {
      const res = await axios.get(ApiRoutes.GET_TRADE);
      if (res.data.status) {
        let newTrades = [];
        let trades=res.data.data.trades;
        trades.forEach(function(trade, index) {
          let temp={
            fla:trade.fla,
            value:trade.id,
            label:trade.fla?trade.name +" (Required Food License)":trade.name
          }
          newTrades.push(temp)
        });
        successCallback(newTrades);
      } else {
        errorCallback(ArrayToString(res.data.messages));
      }
    } catch (e) {
      console.error(e)
      errorCallback(e.toString());
    }
  }


}