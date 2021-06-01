import sqlite3
from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient

app = Flask(__name__)

# [초기 DB 설정하는 부분]

# SQLite
# conn = sqlite3.connet('dog_data_f')
# conn = sqlite3.connet('dog_data_m')

# Mongo DB
client = MongoClient('localhost', 27017)
db = client.dbFindMyDogTest

# Mongo DB 초기화
# db.customer.delete_many({})
# db.dog.delete_many({})

# [HTML 주는 부분]

@app.route('/')
def home():
    return render_template('home/index.html')

@app.route('/join')
def join():
    return render_template('join/index.html')

@app.route('/signin')
def signin():
    return render_template('signin/index.html')

@app.route('/mypage')
def mypage():
    return render_template('mypage/index.html')

@app.route('/register')
def register():
    return render_template('register/index.html')
    
@app.route('/register/2')
def register_2():
    return render_template('register/register_2.html')

@app.route('/register/3')
def register_3():
    return render_template('register/register_3.html')

@app.route('/register/4')
def register_4():
    return render_template('register/register_4.html')

@app.route('/search')
def search():
    return render_template('search/index.html')

@app.route('/search/post')
def post():
    return render_template('search/post.html')


# [API 역할을 하는 부분]

# 홈
@app.route('/home_data', methods=['GET'])
def get_dog_number():
    registered_dog = db.dog.find({}, {'_id': 0})
    result = registered_dog.count()
    result = str(format(test, ","))

    return jsonify({'result': 'success', 'dog_number': result})

# 회원가입
@app.route('/join_data', methods=['POST'])
def post_join():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    name_receive = request.form['name_give']
    dept_receive = request.form['dept_give']
        
    customer_data = {
        'id': id_receive,
        'pw': pw_receive,
        'name': name_receive,
        'dept': dept_receive,
    }

    db.customer.insert_one(customer_data)

    return jsonify({'result': 'success'})

# 로그인
@app.route('/signin_data', methods=['POST'])
def post_signin():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    result = list(db.customer.find({'id': id_receive, 'pw': pw_receive}, {'_id': 0}))

    if result:
        return jsonify({'result': 'success'})
    else:
        return jsonify({'result': 'fail'})


# # 마이페이지
# @app.route('/mypage_data', methods=['POST'])
# def post_mypage():
#     name_receive = request.form['name_give']

#     result = list(db.dog.find({'shel': name_receive}, {'_id': 0}))

#     return jsonify({'result': 'success', 'customer_data': result})


# 유기견 등록
@app.route('/register_data', methods=['POST'])
def post_register():
    img_receive = request.form['img_give']
    num_receive = request.form['num_give']
    breed_receive = request.form['breed_give']
    sex_receive = request.form['sex_give']
    wei_receive = request.form['wei_give']
    byear_receive = request.form['byear_give']
    color_receive = request.form['color_give']
    rdate_receive = request.form['rdate_give']
    ddate_receive = request.form['ddate_give']
    loc_receive = request.form['loc_give']
    shel_receive = request.form['shel_give']
    tel_receive = request.form['tel_give']
    note_receive = request.form['note_give']

    # 성별 한글 변환
    if sex_receive == 'female':
        sex = '암컷'
    else:
        sex = '수컷'

    district = num_receive[0:2]
        
    dog_data = {
        'img': img_receive,
        'num': num_receive,
        'breed': breed_receive,
        'sex': sex,
        'wei': wei_receive,
        'b-year': byear_receive,
        'color': color_receive,
        'reg-date': rdate_receive,
        'due-date': ddate_receive,
        'loc': loc_receive,
        'shel': shel_receive,
        'tel': tel_receive,
        'note': note_receive,
        'dist': district
    }
        
    db.dog.insert_one(dog_data)

    return jsonify({'result': 'success'})


# 유기견 품종 분류
@app.route("/breed_data", methods=['POST'])
def post_breed():
    sex_receive = request.form['sex_give']
    hei_receive = request.form['hei_give']
    wei_receive = request.form['wei_give']
    bcs_receive = request.form['bcs_give']

    # sex = sex_receive
    # wei = cal_BCS(wei_receive, bcs_receive)
    # hei = hei_receive

    # breed_data = check_breed(sex, wei, hei)

    return jsonify({'result': 'success'})

    # return jsonify({'result': 'success', 'breed_data': breed_data})


# def cal_BCS(wei_receive, bcs_receive):
#     if bcs_receive == 'bcs-1':
#         wei = wei_receive*19/16
#     elif bcs_receive == 'bcs-2':
#         wei = wei_receive*8/9
#     elif bcs_receive == 'bcs-4':
#         wei = wei_receive*7/8
#     elif bcs_receive == 'bcs-5':
#         wei = wei_receive*3/4
#     else:
#         wei = wei_receive

#     return round(wei, 2)   # 정상체중 환산 값을 소수점 둘째 자리까지 반환.


# def check_breed(sex, wei, hei):
#     dogsex = sex
#     height = hei
#     weight = wei

#     if dogsex == 'male':
#         con = sqlite3.connect(r"/dog_data_m.db")   #수컷데이터베이스 파일과 연결
#         cursor = con.cursor()

#         cursor.execute("SELECT Breed FROM dog_data_m WHERE (minheight<=? and ? <=maxheight) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

#         result = cursor.fetchall()
#         conn.commit()
#         conn.close()
#     else:
#         con = sqlite3.connect(r"/dog_data_f.db")   #암컷데이터베이스 파일과 연결
#         cursor = con.cursor()

#         cursor.execute("SELECT Breed FROM dog_data_f WHERE (minheight<=? and ? <=maxheight) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

#         result = cursor.fetchall()
#         conn.commit()
#         conn.close()
    
#     return(result)


# 유기견 검색
@app.route('/search_data', methods=['GET', 'POST'])
def check_search():
    if request.method == 'POST':
        receipt_receive = request.form['receipt_give']
        db.order.update_one({'receipt_number': receipt_receive}, {'$set': {'order_state': True}})

        return jsonify({'result': 'success', 'dog_data': result})

    elif request.method == 'GET':
        result = list(db.dog.find({}, {'_id': 0}))

        return jsonify({'result': 'success', 'dog_data': result})


# 유기견 포스트
@app.route('/post_data', methods=['POST'])
def get_post():
    num_receive = request.form['num_give']

    result = db.dog.find_one({'num': num_receive}, {'_id': 0})

    return jsonify({'result': 'success', 'post_data': result})
    


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)