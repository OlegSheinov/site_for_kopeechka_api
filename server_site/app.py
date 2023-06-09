import os

from flask import Flask, render_template

app = Flask(__name__, template_folder=f"{os.getcwd()}/templates", static_folder=f"{os.getcwd()}/static")


@app.route('/')
def hello_world():  # put application's code here
    return render_template("base.html")


if __name__ == '__main__':
    app.run()
