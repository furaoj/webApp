import { useState } from "react";
import axios from "axios";

/* APIサーバ*/
const URL = "http://127.0.0.1:8000/";

/* 銘柄名取得処理*/
export const useGetStockName = (stockId) => {
  let obj = { data: "", msg: "", stockId: "" };
  const [data, setData] = useState(obj);
  const getStockName = () => {
    if (stockId !== "") {
      obj.stockId = stockId;
      axios
        .get(URL + "stockName/" + stockId)
        .then((response) => {
          obj.data = response.data;
          setData(obj);
        })
        .catch((e) => {
          obj.msg = e.message;
          setData(obj);
        });
    }
  };

  return [data, getStockName];
};

/* 株価取得処理*/
export const useGetStock = (stockId) => {
  let obj = { data: "", msg: "", stockId: "" };
  const [data, setData] = useState(obj);
  const [loading, setLoading] = useState(false);
  const getStock = () => {
    if (stockId !== "") {
      setLoading(true);
      obj.stockId = stockId;
      obj.data = "";
      axios
        .get(URL + "stockInfo/" + stockId)
        .then((response) => {
          obj.data = response.data;
          setData(obj);
        })
        .catch((e) => {
          obj.msg = e.message;
          setData(obj);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return [data, loading, getStock];
};
