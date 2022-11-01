import unittest

# テスト対象のモジュールをインポートする
from api.getStockName import get_stockName


class TestAPI(unittest.TestCase):
    def test_get_stockName_OK(self):
        id = 7360
        # テスト対象の関数を呼び出す
        name = get_stockName(id)
        # 関数の返り値が期待した内容と一致するか確認する
        self.assertEqual(name, "　銘柄名：オンデック")

    def test_get_stockName_NG(self):
        id = 1234
        # テスト対象の関数を呼び出す
        name = get_stockName(id)
        # 関数の返り値が期待した内容と一致するか確認する
        self.assertEqual(name, "　銘柄名が取得できませんでした。")
