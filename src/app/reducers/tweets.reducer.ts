import { Action } from '@ngrx/store';
import { Tweet } from '../models/';
import { ActionTypes, TweetsActions } from '../actions/tweet.actions';

export type State = {
  ids: string[];
  entities: { [id: string]: Tweet };
}

const initialState: State = {
  ids: [],
  entities: {}
}

export default function(state = initialState, action: Action): State {
  switch(action.type){
    case ActionTypes.GET_TWEETS_SUCCESS: {
      const tweets: Tweet[] = action.payload
       const newTweets: Tweet[] = tweets.filter(tweet => !state.entities[tweet.id]);

       const newTweetIds = tweets.map(tweet => tweet.id); 

       const newEntities = newTweets
        .reduce((entities: { [id: string]: Tweet }, tweet: Tweet) => {
          return Object.assign(entities, { [tweet.id]: tweet }) 
        }, {});

        return Object.assign({}, state, {
          ids: [...state.ids, ...newTweetIds],
          entities: Object.assign({}, state.entities, newEntities)
        })
    }

    case ActionTypes.GET_ALL_FEEDS_SUCCESS: {
      const tweets: Tweet[] = action.payload
        const newTweets: Tweet[] = tweets.filter(tweet => !state.entities[tweet.id]);

        const newTweetIds = tweets.map(tweet => tweet.id); 

        const newEntities = newTweets
        .reduce((entities: { [id: string]: Tweet }, tweet: Tweet) => {
          return Object.assign(entities, { [tweet.id]: tweet }) 
        }, {});

        return Object.assign({}, state, {
          ids: [...state.ids, ...newTweetIds],
          entities: Object.assign({}, state.entities, newEntities)
        })
    }
    
    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;