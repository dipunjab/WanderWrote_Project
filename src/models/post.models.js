import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
    content: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    isPublished: {
        type: Boolean, 
        default: 0,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    }, { timestamps: true })

postSchema.plugin(mongooseAggregatePaginate)


export const Post = mongoose.model("Post", postSchema)