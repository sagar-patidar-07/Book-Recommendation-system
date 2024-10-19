# Importing necessary libraries and modules
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Getting the absolute path of the directory containing the current file
path_file = os.path.dirname(os.path.abspath(__file__))

# Function to load a file using pickle
def load_pickle_file(file_name):
    with open(os.path.join(path_file, file_name), 'rb') as file:
        return pickle.load(file)

# Loading required files using pickle
matrix = load_pickle_file('matrix.pkl')
model = load_pickle_file('model.pkl')
explicit_dataset = load_pickle_file('explicit_dataset.pkl')
popular_df = load_pickle_file('popular_df.pkl')
popular_year_df = load_pickle_file('popular_year.pkl')

# Function to predict books using collaborative filtering
def funcpred(name):
    def funcnew(name):
        unique_row = explicit_dataset[explicit_dataset['Book-Title'] == name].iloc[0]
        author = unique_row['Book-Author']
        url = unique_row['Image-URL-L']
        return {"book_name": name, "author": author, "image": url}

    distances, indices = model.kneighbors(matrix.loc[name].values.reshape(1, -1), n_neighbors=6)  # 5+1 nearest
    ans = [funcnew(matrix.index[indices.flatten()[i]]) for i in range(1, len(distances.flatten()))]  # Skipping first
    return ans

# Function to print the top books in a dataframe
def printBook(data_frame, n):
    z = data_frame['Book-Title'].unique()
    y = data_frame['Image-URL-L'].unique()
    i = data_frame['Book-Author'].unique()
    ans = []
    
    for x in range(min(len(z), n)):
        w = data_frame['Book-Rating'][data_frame['Book-Title'] == z[x]].count()
        ans.append({"book_name": str(z[x]), "image": str(y[x]), "author": str(i[0]), "rating": str(w)})
    
    return ans

# Function to get top books by the same author
def get_booksAuthor(dataframe, name, n):
    unique_author = dataframe['Book-Author'].unique()[0]
    data = explicit_dataset[explicit_dataset['Book-Title'] != name]

    if unique_author in data['Book-Author'].unique():
        k2 = data[data['Book-Author'] == unique_author].sort_values(by=['Book-Rating'], ascending=False)
        return printBook(k2, n)
    return []

# Function to get top books by the same publisher
def get_booksPublisher(dataframe, name, n):
    unique_publisher = dataframe['Publisher'].unique()[0]
    data = explicit_dataset[explicit_dataset['Book-Title'] != name]

    if unique_publisher in data['Publisher'].unique():
        k2 = data[data['Publisher'] == unique_publisher].sort_values(by=['Book-Rating'], ascending=False)
        return printBook(k2, n)
    return []

@app.route('/recommendKNN', methods=['POST'])
def recommend():
    try:
        book_name = request.json.get('book_name')
        ans = funcpred(book_name)
        data = {"books": ans}
        return jsonify(data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred during recommendation"}), 500

@app.route('/getAuthor', methods=['POST'])
def recommendAuthor():
    book_name = request.json.get('book_name')
    if book_name in explicit_dataset['Book-Title'].unique():
        df = explicit_dataset[explicit_dataset['Book-Title'] == book_name]
        data = {"books": get_booksAuthor(df, book_name, 5)}
        return jsonify(data)
    return jsonify({"error": "Invalid Book Name!!"})

@app.route('/getPublisher', methods=['POST'])
def recommendPublisher():
    book_name = request.json.get('book_name')
    if book_name in explicit_dataset['Book-Title'].unique():
        df = explicit_dataset[explicit_dataset['Book-Title'] == book_name]
        data = {"books": get_booksPublisher(df, book_name, 5)}
        return jsonify(data)
    return jsonify({"error": "Invalid Book Name!!"})

@app.route('/api/popular-books', methods=['GET'])
def get_popular_books():
    return jsonify(popular_df.to_dict(orient='records'))

@app.route('/api/popular-books-year', methods=['GET'])
def get_popular_books_year():
    return jsonify(popular_year_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
