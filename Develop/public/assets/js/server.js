const express = require('express');
const path = require('path');
const fs = require('fs');
const index = require('./index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 3010;
