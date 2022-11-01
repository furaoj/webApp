/*数字をチェック関数*/
export function checkNum(str) {
  const reg = new RegExp(/^[0-9]*$/);
  const res = reg.test(str);
  return res;
}

/*桁数を返す関数*/
export function numDigits(num) {
  /*一旦数値を文字列に変換し、長さを求める*/
  return num.toString().length;
}

/* 銘柄コードチェック処理*/
export const checkInput = (stockId) => {
  let result = false;

  //銘柄コード空の場合終了
  if (stockId === "") {
    return result;
  }

  //数字チェック
  result = checkNum(stockId);
  if (result === true) {
    //数字の場合桁数チェック
    const length = numDigits(stockId);
    if (length !== 4) {
      result = false;
      return result;
    }
  }
  return result;
};
