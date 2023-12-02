const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const Otp = model("otp", otpSchema);

module.exports = Otp;
