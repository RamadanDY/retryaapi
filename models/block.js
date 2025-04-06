import mongoose from "mongoose";
import db from "../db/taskdb";

import  { Schema, model} from mongoose

mongoose.Schema({
    // we create a 
    code:  {type: String,required: true ,unique:  true}
});
