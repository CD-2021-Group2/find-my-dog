import sqlite3
from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
import os
import json

app = Flask(__name__)

# [초기 DB 설정하는 부분]

# Mongo DB
client = MongoClient('localhost', 27017)
db = client.dbFindMyDogTest

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
    result = str(format(result, ","))

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
        'dist': district,
        'num': num_receive,
        'breed': breed_receive,
        'color': color_receive,
        'sex': sex,
        'b-year': byear_receive,
        'wei': wei_receive,
        'loc': loc_receive,
        'note': note_receive,
        'shel': shel_receive,
        'tel': tel_receive,
        'reg-date': rdate_receive,
        'due-date': ddate_receive
    }

    print(dog_data)
        
    db.dog.insert_one(dog_data)

    # 이미지 업로드
    UPLOAD_FOLDER = 'static/uploads/'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    uploaded_file = request.files['file']

    if uploaded_file.filename != '':
        path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        uploaded_file.save(path)
        return jsonify({'result': 'success'})
    else:
        return jsonify({'result': 'fail'})


# 유기견 품종 분류
@app.route("/breed_data", methods=['POST'])
def post_breed():
    sex_receive = request.form['sex_give']
    hei_receive = request.form['hei_give']
    wei_receive = request.form['wei_give']
    bcs_receive = request.form['bcs_give']

    sex = sex_receive
    wei = cal_BCS(int(wei_receive), bcs_receive)
    hei = int(hei_receive)

    breed_data = check_breed(sex, wei, hei)
    arr = [x[0] for x in breed_data]

    print(arr)

    return jsonify({'result': 'success', 'breed_data': arr})


def cal_BCS(wei_receive, bcs_receive):
    if bcs_receive == 'bcs-1':
        wei = wei_receive*19/16
    elif bcs_receive == 'bcs-2':
        wei = wei_receive*8/9
    elif bcs_receive == 'bcs-4':
        wei = wei_receive*7/8
    elif bcs_receive == 'bcs-5':
        wei = wei_receive*3/4
    else:
        wei = wei_receive

    return round(wei, 2)   # 정상체중 환산 값을 소수점 둘째 자리까지 반환.


def check_breed(sex, wei, hei):
    dogsex = sex
    height = hei
    weight = wei

    conn = sqlite3.connect('dog_f')
    conn = sqlite3.connect('dog_me')

    if dogsex == 'male':
        con = sqlite3.connect(r"db/dog_me.db")   #수컷데이터베이스 파일과 연결
        cursor = con.cursor()

        cursor.execute("SELECT Breed FROM dog_me WHERE (minheight<=? and ? <=maxheight) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

        result = cursor.fetchall()
        conn.commit()
        conn.close()
    else:
        con = sqlite3.connect(r"db/dog_f.db")   #암컷데이터베이스 파일과 연결
        cursor = con.cursor()

        cursor.execute("SELECT Breed FROM dog_f WHERE (minheight<=? and ? <=maxheight) and (minweight<=? and ?<=maxweight)",(height,height,weight, weight))

        result = cursor.fetchall()
        conn.commit()
        conn.close()
    
    return(result)


# 유기견 검색
@app.route('/search_data', methods=['POST'])
def check_search():
    opts_receive = request.form['opts_give']

    if opts_receive == '0':
        result = list(db.dog.find({}, {'_id': 0}).sort('reg-date', -1))

        return jsonify({'result': 'success', 'search_data': result})
    else:
        opts = json.loads(opts_receive)
        opts_k = list(opts.keys())
        opts_v = list(opts.values())
        opts_num = len(opts_k)

        if opts_num == 1:
            result = list(db.dog.find({opts_k[0]: {"$regex": opts_v[0]}}, {'_id': 0}).sort('reg-date', -1))
        elif opts_num == 2:
            result = list(db.dog.find({opts_k[0]: {"$regex": opts_v[0]}, opts_k[1]: {"$regex": opts_v[1]}}, {'_id': 0}).sort('reg-date', -1))
        elif opts_num == 3:
            result = list(db.dog.find({opts_k[0]: {"$regex": opts_v[0]}, opts_k[1]: {"$regex": opts_v[1]}, opts_k[2]: {"$regex": opts_v[2]}}, {'_id': 0}).sort('reg-date', -1))
        elif opts_num == 4:
            result = list(db.dog.find({opts_k[0]: {"$regex": opts_v[0]}, opts_k[1]: {"$regex": opts_v[1]}, opts_k[2]: {"$regex": opts_v[2]}, opts_k[3]: {"$regex": opts_v[3]}}, {'_id': 0}).sort('reg-date', -1))
        else:
            result = list(db.dog.find({opts_k[0]: {"$regex": opts_v[0]}, opts_k[1]: {"$regex": opts_v[1]}, opts_k[2]: {"$regex": opts_v[2]}, opts_k[3]: {"$regex": opts_v[3]}, opts_k[4]: {"$regex": opts_v[4]}}, {'_id': 0}).sort('reg-date', -1))

        return jsonify({'result': 'success', 'search_data': result})   



# 유기견 포스트
@app.route('/post_data', methods=['POST'])
def get_post():
    num_receive = request.form['num_give']

    result = db.dog.find_one({'num': num_receive}, {'_id': 0})

    return jsonify({'result': 'success', 'post_data': result})
    


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)