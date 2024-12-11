import axios from "axios";

const baseUrl='/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create=(newObject)=>{
    const request=axios.post(baseUrl,newObject)
    return request.then(response=>response.data)
}

const update=(updatedObject,id)=>{
    const itemLink=`${baseUrl}/${id}`
    const request=axios.put(itemLink,updatedObject)
    return request.then(response=>response.data)
}

const deletePerson=(id)=>{
    const itemLink=`${baseUrl}/${id}`
    const request=axios.delete(itemLink)
    return request.then(response=>{
        return response.data
    })
}


export default {getAll,create,update,deletePerson}