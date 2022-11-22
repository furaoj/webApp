import psycopg2


def get_stockName(id):
    stock_name = ""
    try:
        # 接続情報
        dsn = "dbname=stock host=localhost user=postgres password=1234"
        conn = psycopg2.connect(dsn)  # コネクション
        cur = conn.cursor()  # カーサー
        sql = "select name from stock_info where code='{0}'".format(id)
        cur.execute(sql)  # クエリの実行
        stock_name = "　銘柄名：" + cur.fetchone()[0]

        # コネクション等は閉じる。
        cur.close()
        conn.close()
    except Exception as e:
        print(str(e))
        stock_name = "　銘柄名が取得できませんでした。"

    return stock_name
