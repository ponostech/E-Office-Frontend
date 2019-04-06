import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class TradeService {
  async get() {
      let res=await axios.get(ApiRoutes.TRADES)
      return res.data
  }

}

export const fetchTrades=async ()=>{
  return  await axios.get(ApiRoutes.TRADES)
}