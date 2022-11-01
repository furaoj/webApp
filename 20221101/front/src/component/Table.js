import React, { useContext } from "react";
import { Global } from "../App";
import { StockInfo } from "./InfoPage";

function StockTable(props) {
  const global = useContext(Global);
  const stockInfo = useContext(StockInfo);
  return (
    <div>
      {global.toString()}
      <table className="Table">
        <thead>
          <tr>
            <th>日付</th>
            <th>始値</th>
            <th>高値</th>
            <th>安値</th>
            <th>終値</th>
            <th>出来高</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stockInfo).map((i) => (
            <tr key={i}>
              <td>{stockInfo[i].timestamp}</td>
              <td>{stockInfo[i].open}</td>
              <td>{stockInfo[i].high}</td>
              <td>{stockInfo[i].low}</td>
              <td>{stockInfo[i].close}</td>
              <td>{stockInfo[i].volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
