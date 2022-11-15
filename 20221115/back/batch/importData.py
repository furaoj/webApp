import psycopg2
import os

def importData():
    dataFile = os.path.abspath('batch/data.csv')
    dsn = "dbname=stock host=localhost user=postgres password=1234"
    conn = psycopg2.connect(dsn)
    try:
        cursor = conn.cursor()
            
        sql ='''CREATE TABLE IF NOT EXISTS public.stock_info
        (
            code character(5) COLLATE pg_catalog."default" NOT NULL,\
            name text COLLATE pg_catalog."default" NOT NULL,\
            PRIMARY KEY (code)
        )'''
        cursor.execute(sql)

        sql1 = 'delete from stock_info'
        cursor.execute(sql1)
            
        sql2 = '''COPY stock_info(code,name)
        FROM \'''' + dataFile + '''\'
        DELIMITER ','
        CSV HEADER;'''
        cursor.execute(sql2)
            
        sql3 = 'select * from stock_info;'
        cursor.execute(sql3)
        for i in cursor.fetchall():
            print(i)
            
        conn.commit()
    except Exception as e:
        print(e)
        conn.rollback()
    finally:
        conn.close()
