from yahoo_finance_api2 import share
from sktime.utils.plotting import plot_series
from sktime.forecasting.model_selection import temporal_train_test_split
from sktime.forecasting.theta import ThetaForecaster
from sktime.forecasting.base import ForecastingHorizon
from sktime.forecasting.naive import NaiveForecaster
from sktime.forecasting.trend import STLForecaster
from sklearn.metrics import mean_absolute_percentage_error
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, date, timedelta
from enum import IntEnum, auto


# 曜日の列挙型
class Week(IntEnum):
    Mon = 0
    Tue = auto()
    Wed = auto()
    Thu = auto()
    Fri = auto()
    Sat = auto()
    Sun = auto()


# 曜日取得
def get_week(num):
    week = ""
    # 曜日の判定と出力
    if Week.Mon == num:
        week = Week.Mon.name
    elif Week.Tue == num:
        week = Week.Tue.name
    elif Week.Wed == num:
        week = Week.Wed.name
    elif Week.Thu == num:
        week = Week.Thu.name
    elif Week.Fri == num:
        week = Week.Fri.name
    elif Week.Sat == num:
        week = Week.Sat.name
    elif Week.Sun == num:
        week = Week.Sun.name

    return week


def get_stockValue(id):
    result = []
    try:
        stock_share = share.Share(str(id) + ".T")
        stock_data = None
        # 一日足で過去1年分のデータ
        stock_data = stock_share.get_historical(
            share.PERIOD_TYPE_YEAR, 1, share.FREQUENCY_TYPE_DAY, 1
        )

        # timestamp日付に変換
        i = 0
        for value in stock_data["timestamp"]:
            stock_data["timestamp"][i] = str(
                datetime.fromtimestamp(value / 1000).strftime("%Y/%m/%d")
            )
            i = i + 1

        # 画面表示用のため、各要素の配列をJSONに変換
        
        i = 0
        for value in stock_data["timestamp"]:
            temp = {
                "timestamp": str(stock_data["timestamp"][i])
                + " "
                + str(
                    get_week(
                        datetime.strptime(stock_data["timestamp"][i], "%Y/%m/%d").weekday()
                    )
                ),
                "open": stock_data["open"][i],
                "high": stock_data["high"][i],
                "low": stock_data["low"][i],
                "close": stock_data["close"][i],
                "volume": stock_data["volume"][i],
            }
            result.append(temp)
            i = i + 1
        # print(result)

        # 予測用一旦DataFrame変換、画面には戻していない
        df = pd.DataFrame(
            {
                "timestamp": stock_data["timestamp"],
                "open": stock_data["open"],
                "high": stock_data["high"],
                "low": stock_data["low"],
                "close": stock_data["close"],
                "volume": stock_data["volume"],
            }
        )
        # print(df.to_json())
        predict_stockValue(df, id)
    except Exception as e:
        print(e)

    return result


def predict_stockValue(df, id):
    # 取引日と終値のみのSeriesを生成
    target = df["close"]
    index = df["timestamp"]
    target.index = pd.PeriodIndex(index, freq="D")
    
    # targetの20%をtestデータに分割
    y_train, y_test = temporal_train_test_split(
        target, test_size=int(len(target) * 0.2)
    )
    
    # テスト期間設定
    fh_test = ForecastingHorizon(y_test.index, is_relative=False)

    # 将来予測
    fh_index = pd.period_range(start=datetime.today() , end="2022-12-31", freq="D")
    fh = ForecastingHorizon(fh_index, is_relative=False)

    # 予測モデル
    #周期成分とトレンド、ノイズに分解して予測する
    #forecaster = STLForecaster(sp=12)
    #単純指数平滑法 (SES)過去のデータの重みを減らして予測する
    forecaster = ThetaForecaster(sp=12)
    
    # トレーニング
    forecaster.fit(y_train)
    
    # テスト期間予測
    y_pred_test = forecaster.predict(fh_test)
    # 将来の予測
    y_pred = forecaster.predict(fh)

    #評価(MAPE値が小さいのがよい)
    result = mean_absolute_percentage_error(y_test, y_pred_test)

    # グラフ化（画像出力）
    plot_series(
        y_train,
        y_test,
        y_pred_test,
        y_pred,
        labels=["y_train", "y_test", "y_pred_test","y_pred"],
        x_label=result,
        y_label=id
    )