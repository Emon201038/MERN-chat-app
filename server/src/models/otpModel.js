const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      set: (v) => {
        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const Otp = model("otp", otpSchema);

module.exports = Otp;
