import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from textblob import TextBlob
import re


import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def generate_song_feature(complete_feature_set, song_id):
    '''
    Extract features for a specific song
    ---
    Input: 
    complete_feature_set (pandas dataframe): Dataframe containing all song features
    song_id (str): ID of the song
        
    Output: 
    song_features (pandas series): Features of the specified song
    '''
    
    # Find features for the specified song
    song_features = complete_feature_set[complete_feature_set['id'] == song_id].drop(columns='id').iloc[0]
    
    return song_features

def generate_song_recos(df, song_id, complete_feature_set, top_n=10):
    '''
    Generate recommendations based on a specific song.
    ---
    Input: 
    df (pandas dataframe): Spotify dataframe
    song_id (str): ID of the specific song
    complete_feature_set (pandas dataframe): Complete feature set of all songs
    top_n (int): Number of recommendations to return
        
    Output: 
    recommendations (pandas dataframe): Top recommendations for the specified song
    '''
    
    # Check if song_id is in complete_feature_set
    if song_id in complete_feature_set['id'].values:
        # Extract features of the specific song
        song_features = complete_feature_set[complete_feature_set['id'] == song_id].drop(columns='id').iloc[0].values.reshape(1, -1)
    else:
        print("No track found in dataset")
    
    # Compute cosine similarity between the specific song and all songs in the dataset
    similarities = cosine_similarity(song_features, complete_feature_set.drop(columns='id').values)
    
    # Sort the similarities and get indices of top recommendations
    top_indices = similarities.argsort()[0][-top_n:][::-1]
    
    # Get top recommendations
    recommendations = df.iloc[top_indices]
    
    return recommendations

# Example function to recommend songs based on a single track ID
def recommend_from_song(songDF, complete_feature_set, song_id, top_n=10):
    '''
    Recommend songs based on a specific song ID
    ---
    Input: 
    songDF (pandas dataframe): Spotify dataframe
    complete_feature_set (pandas dataframe): Complete feature set of all songs
    song_id (str): ID of the specific song
    top_n (int): Number of recommendations to return
    
    Output: 
    recommendations (pandas dataframe): Top recommendations for the specified song
    '''
    
    # Generate recommendations
    top_recommendations = generate_song_recos(songDF, song_id, complete_feature_set, top_n)
    
    return top_recommendations
