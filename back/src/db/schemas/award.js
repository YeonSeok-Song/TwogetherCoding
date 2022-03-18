import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        award : {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
