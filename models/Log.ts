import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["visitor", "parcel"],
      required: true,
    },
    description:{
       type:'String',
       required:true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    purpose: {
      type: String,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
