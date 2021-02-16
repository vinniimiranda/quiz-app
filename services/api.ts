import axios from 'axios'
import { ENV } from '../config/env'

const { baseURL } = ENV
const API = axios.create({
  baseURL, 
})

export default API
