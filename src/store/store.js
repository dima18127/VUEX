import axios from 'axios'
import {createStore} from 'vuex'
// import { axios } from "axios";

const store = createStore(
    {
    state(){
        return {
          posts: []
        }
    },

    actions: {
      GET_STORE_FROM_API ({commit}) {
        return axios("https://dummyjson.com/products", {
          method: 'GET'
        }).then ((response) => {
          commit('updatePosts', response.data.products)
          console.log(response.data.products);
        })
      }
      // фетч
      // async fetching(ctx){
      // const res = await fetch('https://dummyjson.com/products?_limit=13');
      // const posts = await res.json()
      // ctx.commit('updatePosts', posts.products)
      // .catch(() => {
      //   this.Errored = true
      // });
      },
    
    mutations: {
      updatePosts(state,posts){
        state.posts = posts
      }
    },

    getters: {
      AllPosts(state){
        return state.posts
      }
    }
}
)


export default store