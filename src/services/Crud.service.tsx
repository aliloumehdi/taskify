import axios from "axios"; 
import { Todo } from "../model";
const API = "http://localhost:3001/tasks/"
export default class CrudService {
    
    constructor() {
         
    }

    add(body: any) {
    return    axios.post(API + "create", body)

    }
    getOne(id: string) {
      return axios.get(`${API}/${id}`) 
    }
    getAll() {
       return axios.get(`${API}/`)
    }
    update(task: Todo) {
        return  axios.put(`${API}/${task._id}/update`, task) 
    } 
    delete(id:string){

     return   axios.delete(`${API}${id}/delete`) 
    }
  
    setDone(id:string,state:boolean){
        return  axios.put(`${API}${id}/state/${state}`) 
    
    }
}