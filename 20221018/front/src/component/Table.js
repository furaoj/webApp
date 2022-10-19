import React from "react";

function StockTable(props) {
  return (
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
        {Object.keys(props.stockInfo).map((i) => (
          <tr key={i}>
            <td>{props.stockInfo[i].timestamp}</td>
            <td>{props.stockInfo[i].open}</td>
            <td>{props.stockInfo[i].high}</td>
            <td>{props.stockInfo[i].low}</td>
            <td>{props.stockInfo[i].close}</td>
            <td>{props.stockInfo[i].volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
