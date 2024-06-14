import { model , Schema } from "mongoose";

//  Creating the schema
const courseSchema = new Schema({
    title : {
        type : String,
        required : [true , 'title is required'],
        minLength : [8 , 'Minlength is 8 character'],
        maxLength : [60 , 'Title should be less than 60 character'],
        trim : true,
    },
    description : {
        type : String,
        required : [true , 'Description is required'],
        minLength : [8 , 'Minlength is 8 character'],
        maxLength : [200 , 'Description should be less than 200 character'],
        trim : true,
    },
    category : {
        type : String,
        required : [true , 'category is required'],

    },
    thumbnail : {
        //  Required is try dikkat de rha tha issliye isse aisse dummy banakar rkhe!!!
        public_id : 'Dummy',
        secure_url : 'Dummy'
    },
    lectures : [
        // We have list of lectures
        {
            title : String,
            description : String,
            lecture : {
                public_id : {
                    type : String,
                required : true,

                },
                secure_url : {
                    type : String,
                required : true,

                }
            }
        }
    ],

    numberOfLectures : {
        type : Number,
        default : 0,
    },
    createdBy : {
        type : String,
        required : true,
    }
}, {
    timestamps : true,
});


//  Creating the model for the above schema
//  Database mai collection ka naam aur course Schema
const Course = model('Course' , courseSchema);

export default Course;