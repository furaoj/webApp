/*数字をチェック関数*/
export function checkNum(str) {
  const reg = new RegExp(/^[0-9]*$/);
  const res = reg.test(str);
  return res;
}
