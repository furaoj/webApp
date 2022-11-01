import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkNum, checkInput } from "./Utility";
import { useGetStock, useGetStockName } from "./CustomHook";

function HomePage() {
  //URLから銘柄コードパラメータ取得
  let stockIdPara = "";
  const search = useLocation().search;
  if (search !== "") {
    const query = new URLSearchParams(search);
    stockIdPara = query.get("stockId");
  }

  const [stockId, setStockId] = useState(stockIdPara);
  const [stockMsg, setStockMsg] = useState("");

  const inputRef = useRef("");

  //useEffectフック
  useEffect(() => {}, []);

  /* 銘柄名取得処理*/
  const [stockName, getStockName] = useGetStockName(stockId);

  /* 株価情報取得処理*/
  const [stockData, loading, getStock] = useGetStock(stockId);

  //銘柄コード入力
  const handleInput = (event) => {
    //const value = event.target.value;
    const value = inputRef.current.value;
    if (checkNum(value)) {
      setStockId(value);
    }
  };

  //株価取得
  /* 株価取得ボタンクリック時の処理*/
  const handleGetStock = () => {
    if (checkInput(stockId)) {
      getStock();
      setStockMsg("");
    } else {
      //setStockNameDisplay("　銘柄コードの入力が不正です。");
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
            stockName: stockName.data.stock_name,
          },
        });
      } else {
        setStockMsg("株価情報が取得できませんでした。");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockData]);

  /* 銘柄名入力エンターキー時の処理*/
  const handleGetStockName = (e) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    if (checkInput(stockId)) {
      getStockName();
    }
  };

  return (
    <div className="HomeDiv">
      <p>React & Python 勉強</p>
      <label>銘柄コード</label>
      <input
        type="text"
        id="stock_id"
        onChange={handleInput}
        value={stockId}
        ref={inputRef}
        onKeyDown={handleGetStockName}
      ></input>
      <p>{stockName.data.stock_name}</p>
      <button onClick={handleGetStock}>株価取得</button>
    </div>
  );
}

export default HomePage;
