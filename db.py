from pymongo import MongoClient

# Mongo DB
client = MongoClient('localhost', 27017)
db = client.dbFindMyDogTest

# Mongo DB 초기화
# db.customer.delete_many({})
db.dog.delete_many({})



print('데이터 업데이트 완료')