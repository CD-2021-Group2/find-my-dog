import sqlite3
from flask import Flask, render_template, request


app = Flask(__name__)
@app.route("/", methods=['GET', 'POST'])

def fist():
    return render_template('html_Test.html')

@app.route("/", methods=['GET', 'POST'])
def sex():
    if request.method == 'POST':
        dogsex = request.form.get("dogsex")  #강아지 성별 입력 수컷/암컷 입력값 둘 중 1개 입력
        return dogsex
        
        
        


@app.route("/", methods=['GET', 'POST'])
def hei():
        if request.method =='POST':
            height = request.form.get("height") #html name 지정에 따라 달라짐
            return height
        
@app.route("/", methods=['GET', 'POST'])
def BCSwei():
    if request.method =='POST': 
        bcs = request.form.get("bcs") #입력받은 bcs값에 따른 무게 분류
        wei = request.form.get("wei") #등록 유기견의 현재 몸무게 . name지정에 따라 바뀔 수 있음
        if bcs == 'first': # bcs의 각 선택값의 name 지정에 따라 바뀔 수 있음
            weight = wei*19/16
            
        elif bcs == 'second':
            weight = wei*8/9
        elif bcs == 'forth':
            weight = wei*7/8
        elif bcs == 'fifth':
            weight = wei*3/4
        else:
            weight
        
        return round(weight,2)  #정상체중 환산 값을 소수점 둘째 자리까지 반환.

if __name__== '--main--':
    app.run()


"""height = input("체고: ")
weight = input("무게: ") #입력값으로 DB조회 검사-- 데이터베이스 조회 성공.
"""

#데이터베이스 파일과 파이썬 연결코드 암/수 테이블 분리

if dogsex == 'male':
    con = sqlite3.connect("c:/Users/tpdls/Desktop/종합설계/breed_m/dog_data_m.db")   #수컷데이터베이스 파일과 연결
    cursor = con.cursor()

    cursor.execute("SELECT Breed FROM dog_data_Fe_csv WHERE (minhegiht<=? and ? <=maxhegiht) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

    result = cursor.fetchall()
    print(result)
else:
    con = sqlite3.connect("c:/Users/tpdls/Desktop/종합설계/breed_m/dog_data_fe.db")   #수컷데이터베이스 파일과 연결
    cursor = con.cursor()

    cursor.execute("SELECT Breed FROM dog_data_Fe_csv WHERE (minhegiht<=? and ? <=maxhegiht) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

    result = cursor.fetchall()
    print(result)




    
    
