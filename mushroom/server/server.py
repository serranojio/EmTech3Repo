from flask import Flask, send_file
from picamer2 import Picamera2

app = Flask(__name__)
camera = Picamera2()

@app.route('/capture', methods=['GET'])
def capture_image():
    