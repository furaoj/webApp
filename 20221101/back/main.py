from typing import Union
from pathlib import Path
from fastapi import FastAPI

# from fastapi.responses import FileResponse
import base64
from fastapi.middleware.cors import CORSMiddleware
from api.getStockInfo import get_stockValue
from api.getStockName import get_stockName


app = FastAPI()

origins = [
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/stockInfo/{stock_id}")
async def get_stock_info(stock_id: str):
    # API処理を呼び出し
    value = get_stockValue(stock_id)
    return {"stock_id": stock_id, "stock_info": value}


@app.get("/stockPredict/{stock_id}")
def get_stock_predict(stock_id: str):

    # API処理を呼び出し
    filename = stock_id + ".png"
    current = Path() / "files" / filename
    file_data = open(current, "rb").read()

    # 画像データ変換
    b64_data = base64.b64encode(file_data).decode("utf-8")

    return b64_data


@app.get("/stockName/{stock_id}")
def get_stock_name(stock_id: str):
    # API処理を呼び出し
    value = get_stockName(stock_id)
    return {"stock_id": stock_id, "stock_name": value}
