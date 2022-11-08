import { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import StockTable from "./Table";
import { Global } from "../App";

export const StockInfo = createContext([]);

function InfoPage() {
  //銘柄コードパラメータ受け取り
  const location = useLocation();
  const [stockId] = useState(location.state.stockId);
  const [stockInfo] = useState(location.state.stockInfo);
  const [stockName] = useState(location.state.stockName);
  const global = useContext(Global);
  return (
    <div className="InfoDiv">
      <h3>
        {stockId + " " + stockName}{" "}
        <Link
          to={"/?stockId=" + stockId + "&stockName=" + stockName}
          relative="path"
        >
          戻る
        </Link>
      </h3>
      <h5>{global.toString()}</h5>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          {stockInfo.length > 0 && <StockTable stockInfo={stockInfo} />}
        </Col>
      </Row>
    </div>
  );
}

export default InfoPage;
