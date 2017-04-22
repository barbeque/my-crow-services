#!/usr/bin/python

from flask import Flask
from flask_json import FlaskJSON, as_json
app = Flask(__name__)
json = FlaskJSON(app)

@app.route("/caw/<int:caw_count>")
@as_json
def caw(caw_count):
    result = { "noises": [] }
    for i in range(0, int(caw_count)):
        result["noises"].append("caw")
    return result

if __name__ == '__main__': app.run(debug=True)
