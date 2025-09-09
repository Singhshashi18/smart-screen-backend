import mongoose, { Schema, model, models } from "mongoose";

const BoxSchema = new Schema(
  {
    boxNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    }, 
    status:{
      type:String,
      enum:['available','occupied','damaged'],
      default:'available',

    },
    currentLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log",
      default: null,
    },
  },
  { timestamps: true }
);

export const Box = models.Box || model("Box", BoxSchema);
