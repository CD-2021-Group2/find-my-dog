import sqlite3
from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

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



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)