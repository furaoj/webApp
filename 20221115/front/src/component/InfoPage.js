import { useState, createContext, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import StockTable from "./Table";
import { Global } from "../App";
import PredictDialog from "./PredictDialog";
import { usePredictStock } from "./CustomHook";

export const StockInfo = createContext([]);

function InfoPage() {
  //銘柄コードパラメータ受け取り
  const location = useLocation();
  const [stockId, setStockId] = useState(location.state.stockId);
  const [stockInfo] = useState(location.state.stockInfo);
  const [stockName] = useState(location.state.stockName);
  const global = useContext(Global);
  const [stockImg, setStockImg] = useState("");
  const [show, setShow] = useState(false);

  /* 株価予測情報取得処理*/
  const [stockPredictData, loading, predictStock] = usePredictStock(stockId);

  /* 株価予測ボタンクリック時の処理*/
  const handlePredictStock = () => {
    predictStock();
  };

  /* 株価予測処理終わった時*/
  useEffect(() => {
    if (stockPredictData.data !== null) {
      if (
        stockPredictData.data.stock_image !== undefined &&
        stockPredictData.data.stock_image !== ""
      ) {
        setStockImg(stockPredictData.data.stock_image);
        setShow(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(stockPredictData)]);

  /* 株価予測ダイアログ閉じる処理*/
  const handleClose = () => {
    setShow(false);
  };

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
        <Col>
          <Button
            onClick={handlePredictStock}
            variant="outline-success"
            size="lg"
            style={{ width: 400, height: 50 }}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <div></div>
            )}
            株価予測
          </Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          {stockInfo.length > 0 && <StockTable stockInfo={stockInfo} />}
        </Col>
      </Row>
      <PredictDialog
        show={show}
        handleCallbackClose={handleClose}
        data={stockImg}
      ></PredictDialog>
    </div>
  );
}

export default InfoPage;
