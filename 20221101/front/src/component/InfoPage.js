import { useState, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import StockTable from "./Table";

export const StockInfo = createContext([]);

function InfoPage() {
  //銘柄コードパラメータ受け取り
  const location = useLocation();
  const [stockId] = useState(location.state.stockId);
  const [stockInfo] = useState(location.state.stockInfo);
  const [stockName] = useState(location.state.stockName);
  return (
    <div className="InfoDiv">
      <p>株価表示</p>
      <p>{stockId}</p>
      <p>{stockName}</p>
      <Link to={"/?stockId=" + stockId} relative="path">
        戻る
      </Link>
      <StockInfo.Provider value={stockInfo}>
        <StockTable />
      </StockInfo.Provider>
    </div>
  );
}

export default InfoPage;
