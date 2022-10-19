import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkNum } from "./Utility";

function HomePage() {
  //URLから銘柄コードパラメータ取得
  let stockIdPara = "";
  const search = useLocation().search;
  if (search !== "") {
    const query = new URLSearchParams(search);
    stockIdPara = query.get("stockId");
  }

  const [stockId, setStockId] = useState(stockIdPara);

  //銘柄コード入力
  const handleInput = (event) => {
    const value = event.target.value;
    if (checkNum(value)) {
      setStockId(value);
    }
  };

  //株価取得
  const navigate = useNavigate();
  const handleGetStock = () => {
    if (stockId !== "") {
      navigate("/Info", {
        state: {
          stockId: stockId,
        },
      });
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
      ></input>
      <button onClick={handleGetStock}>株価取得</button>
    </div>
  );
}

export default HomePage;
