import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StockTable from "./Table";

//株価テストデータ
const stockInfo = [
  {
    timestamp: "2022/10/01",
    open: 1000,
    high: 1200,
    low: 1000,
    close: 1050,
    volume: 1000000,
  },
  {
    timestamp: "2022/10/02",
    open: 1000,
    high: 1200,
    low: 1000,
    close: 1050,
    volume: 1000000,
  },
  {
    timestamp: "2022/10/03",
    open: 1000,
    high: 1200,
    low: 1000,
    close: 1050,
    volume: 1000000,
  },
];

function InfoPage() {
  //銘柄コードパラメータ受け取り
  const location = useLocation();
  const [stockId] = useState(location.state.stockId);
  return (
    <div className="InfoDiv">
      <p>株価表示</p>
      <p>{stockId}</p>
      <Link to={"/?stockId=" + stockId} relative="path">
        戻る
      </Link>
      <StockTable stockInfo={stockInfo} />
    </div>
  );
}

export default InfoPage;
