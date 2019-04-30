import axios from "axios";
import { ApiRoutes } from "../config/ApiRoutes";

export class CategoryServices {
  async get() {
      let res=await axios.get(ApiRoutes.CATEGORY)
      return res
  }
  async fetch(errorCallback,successCallback){
    let categories = [];
    try {
      let res = await axios.get(ApiRoutes.CATEGORY);
      if (res.data.status) {
        res.data.data.area_categories.forEach(function(cat) {
          const roads = cat.roads;
          let roadOptions = [];
          roads.forEach((road) => {
            let item = {
              label: road,
              value: cat.id
            };
            roadOptions.push(item);
          });
          let c = {
            label: `(${cat.name})`,
            options: roadOptions
          };
          categories.push(c);
        });
        successCallback(categories)
      }else{
        errorCallback("Something went wrong: Please try again later")
      }
    }catch (e) {
      console.error(e)
      errorCallback(e.toString())
    }
  }

}