import axios from 'axios'
const url = '/api/persons'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const setPersons = async (person) => {
    const config = {
        headers: {Authorization: token}
    }

    const request = await axios.post(url, person, config)
    return request.data
}

const deletePerson = (id) => {
    const newUrl = url + "/" + id
    const request = axios.delete(newUrl)
    return request.then(reponse => getPersons()) 
}

const updatePerson = (id, obj) => {
    const newUrl = url + "/" + id
    const request = axios.put(newUrl, obj)
    return request.then(response => response.data)
}
export default {getPersons, setPersons, deletePerson, updatePerson, setToken}