import pandas as pd
import csv
from pymongo import MongoClient
import urllib.request

# Pandas
df = pd.read_excel('db/dog_ex.xlsx')
df.to_csv('db/dog_ex.csv')

# CSV
e = open('db/dog_ex.csv', 'r')
g = csv.DictReader((e))

# Mongo DB
client = MongoClient('localhost', 27017)
db = client.dbFindMyDogTest

# Mongo DB 초기화
db.customer.delete_many({})
db.dog.delete_many({})

# 로그인 테스트 데이터
customer_data = {
        'id': 'hufs',
        'pw': '1234',
        'name': '홍길동',
        'dept': 'indi',
    }

db.customer.insert_one(customer_data)


# 유기견 테스트 데이터
for i in g:
    del i['']
    # i['breed'] = '["테스트1","테스트2","테스트3"]'
    dog_data = i
    db.dog.insert_one(dog_data)

    # for k, v in i.items():
    #     print(k,v)
    # print("-----------------")

registered_dog = db.dog.find({}, {'_id': 0})
result = registered_dog.count()
print(result)
