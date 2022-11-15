import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  FloatingLabel,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { checkInput } from "./Utility";
import { useGetStock, useGetStockName } from "./CustomHook";

function HomePage() {
  //URLから銘柄コードパラメータ取得
  let stockIdPara = "";
  let stockNamePara = "";
  const search = useLocation().search;
  if (search !== "") {
    const query = new URLSearchParams(search);
    stockIdPara = query.get("stockId");
    stockNamePara = query.get("stockName");
  }

  const [stockId, setStockId] = useState("");
  const [stockMsg, setStockMsg] = useState("");
  const [stockNameDisplay, setStockNameDisplay] = useState("");
  const [flg, setFlg] = useState(true);
  const inputRef = useRef("");

  /* 初期処理*/
  useEffect(() => {
    setStockId(stockIdPara);
    setStockNameDisplay(stockNamePara);
    if (stockIdPara !== "" && stockNamePara !== "") {
      setFlg(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 株価情報取得処理*/
  const [stockData, loading, getStock] = useGetStock(stockId);

  /* 株価取得ボタンクリック時の処理*/
  const handleGetStock = () => {
    if (checkInput(stockId)) {
      getStock();
      setStockMsg("");
    } else {
      setStockNameDisplay("　銘柄コードの入力が不正です。");
    }
  };

  /* 株価情報が取得された時に処理*/
  const navigate = useNavigate();
  useEffect(() => {
    if (stockData.data !== "") {
      if (stockData.data.stock_info !== null) {
        navigate("/Info", {
          state: {
            stockInfo: stockData.data.stock_info,
            stockId: stockId,
            stockName: stockNameDisplay,
          },
        });
      } else {
        setStockMsg("株価情報が取得できませんでした。");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockData]);

  /* 銘柄名取得処理*/
  const [stockName, getStockName] = useGetStockName(stockId);

  /* 銘柄名エンターキー押した時の処理*/
  const handleGetStockName = (e) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    if (checkInput(inputRef.current.value)) {
      getStockName();
    } else {
      setStockNameDisplay("　銘柄コードの入力が不正です。");
    }
  };

  /* 銘柄名取得処理終わった時*/
  useEffect(() => {
    if (stockName.data !== null) {
      if (stockName.data !== "") {
        setStockNameDisplay(stockName.data.stock_name);
        if (stockName.data.stock_name !== "　銘柄名が取得できませんでした。") {
          setFlg(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockName]);

  return (
    <div className="InputDiv">
      <h2>React & Python 勉強</h2>
      <Row>
        <Col>
          <FloatingLabel
            label={"銘柄コード" + stockNameDisplay}
            id="stock_name"
          >
            <Form.Control
              type="text"
              name="stock_id"
              id="stock_id"
              value={stockId}
              onChange={(event) => {
                setStockId(event.target.value);
                setStockNameDisplay("");
                setFlg(true);
              }}
              onKeyDown={handleGetStockName}
              style={{ width: 400, height: 50 }}
              ref={inputRef}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Button
            onClick={handleGetStock}
            //variant="outline-primary"
            size="lg"
            disabled={loading || flg}
            //class="get_stock"
            style={{ width: 400, height: 50 }}
            className="InputButton"
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
            株価取得
          </Button>
        </Col>
      </Row>

      <div>{stockMsg}</div>
    </div>
  );
}

export default HomePage;
