import axios from "axios";
import {ApiRoutes} from "../config/ApiRoutes";
import { ArrayToString, ErrorToString } from "../utils/ErrorUtil";
import React from "react";

export class KioskService {
    async create(state,errorCallback,successCallback) {
        const token = localStorage.getItem("access_token");
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        let data = {
            local_council_id: state.localCouncil.value,
            area_category_id: state.category.value,
            address: state.address,
            both_side: state.bothSide ? 1 : 0,
            collapsible: state.collapsible ? 1 : 0,
            road_detail: state.roadDetail,
            length: state.length,
            height: state.height,
            clearance: state.clearance,
            display_type: state.displayType.value,
            land_owner_name: state.landLord,
            land_owner_type: state.landlordType,
            latitude: state.latitude,
            longitude: state.longitude,
            status: 0,
            documents: state.uploadDocuments
        };
        try{
            let res = await axios.post(ApiRoutes.NEW_KIOSK, data, config);
            if (res.data.status) {
                successCallback(ArrayToString(res.data.messages));
            }else{
                if (res.data.validation_error) {
                    errorCallback(ErrorToString(res.data.messages));
                } else {
                    errorCallback(ArrayToString(res.data.messages))
                }
            }
        }catch (e) {
            console.error(e)
            errorCallback(e.toString())
        }
    }
    async get(status,errorCallback,successCallback) {
        const token = localStorage.getItem("access_token");
        const config = { headers: { "Authorization": `Bearer ${token}` } };
        try {
            const res = await axios.get(ApiRoutes.KIOSKS, config );
            if (res.data.status) {
                successCallback( res.data.data.hoarding_applications)
            }else{
                errorCallback("kk")
            }
        } catch (error) {
            errorCallback(error.toString())
        }
    }

    async fetchAdvertiserKiosk(errorCallback,successCallback) {
        const token = localStorage.getItem("access_token");
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        try {
            const res = await axios.get(ApiRoutes.GET_ADVERTISER_KIOSKS, config);
            if (res.data.status) {
                successCallback(res.data.data.kiosk_applications);
            } else {
                errorCallback("Something went wrong: Please try again later")
            }
        } catch (error) {
            console.error("error", error);
            errorCallback(error.toString())
        }
    }

    async fetch(status) {
        const token = localStorage.getItem("access_token");
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        let kiosks = [];
        try {
            if (status) {
                const res = await axios.get(ApiRoutes.STAFF_KIOSK, {
                    params: {
                        status
                    }
                }, config);
                kiosks = res.data.data.kiosk_applications;
            } else {
                const defRes = await axios.get(ApiRoutes.STAFF_KIOSK, config);
                kiosks = defRes.data.data.kiosk_applications;
            }
            console.log(kiosks);
            return kiosks;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
