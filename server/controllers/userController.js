import userModel from "../models/userModel.js";
import cookieParser from "cookie-parser";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

//create user
export const userController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      role,
      answer,
    } = req.body;

    if (!req.file) {
      return res.status(400).send({
        message: "File not found",
        success: false,
      });
    }

    const file = getDataUri(req.file);
    const cloudinary_data = await cloudinary.v2.uploader.upload(file.content);

    const profilePicture = {
      public_id: cloudinary_data.public_id,
      url: cloudinary_data.url,
    };

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const user = new userModel({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
      role,
      profilePicture,
    });

    await user.save();

    res.status(201).send({
      message: "Registration Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Register",
      success: false,
      error: error.message,
    });
  }
};

export default userController;

//login user
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        message: "Provide all Fields",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "Email is not register",
        success: false,
      });
    }
    const isCompare = await user.comparePassword(password);

    if (!isCompare) {
      return res.status(500).send({
        message: "Password is Incorrect",
        success: false,
      });
    }
    const token = await user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        message: "Login Successfull",
        success: true,
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Login Failed",
      success: false,
      error,
    });
  }
};

//get user own profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      message: "Profile fetch successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Profile Error",
      success: false,
      error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    await res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        message: "LOGOUT SUCCESSFULLY",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Logout error",
      success: true,
      error,
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, password, address, city, country, answer, phone } =
      req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    if (answer) user.answer = answer;

    await user.save();

    res.status(200).send({
      message: "Update Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Update Error",
      success: false,
      error,
    });
  }
};

//update password
export const updatePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(404).send({
        message: "Password is Incorrect",
        success: false,
        error,
      });
    }
    const isMatch = await user.comparePassword(oldpassword);
    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid Old Password",
        success: false,
      });
    }
    user.password = newpassword;
    user.password = undefined;
    user.save();
    res.status(200).send({
      message: "Password Update Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Updating Password",
      success: false,
      error,
    });
  }
};

//update pic
export const profilePic = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const getPic = await getDataUri(req.file);

    const delPic = await cloudinary.v2.uploader.destroy(
      user.profilePicture.public_id
    );

    const uploadpic = await cloudinary.v2.uploader.upload(getPic.content);
    user.profilePicture = {
      public_id: uploadpic.public_id,
      url: uploadpic.url,
    };
    await user.save();
    res.status(200).send({
      message: "upload image",
      success: true,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "ProfilePic Error",
        success: false,
        error,
      });
  }
};

//reset password
export const passwordResetController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        message: "Provide all fields",
        success: false,
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        message: "Invalid user and answer is not found",
        success: false,
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({
      message: "password is reset",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        message: "Error while reset password",
        success: false,
        error,
      });
  }
};

//get all user
export const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(200).send({
      message: "All user is fetched",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error during fetch user",
      success: false,
      error,
    });
  }
};

//set single user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error:", error);
    if (error.name === "CastError") {
      return res.status(500).send({
        message: "Invalid ID format",
        success: false,
      });
    }
    res.status(500).send({
      message: "Error during fetching single user",
      success: false,
      error,
    });
  }
};

//update other user
export const updateOtherUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { name, email, address, city, country, phone } = req.body;

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;

    if (req.file) {
      const file = await getDataUri(req.file);

      if (user.profilePicture && user.profilePicture.public_id) {
        await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
      }

      const cloudinary_data = await cloudinary.v2.uploader.upload(file.content);

      user.profilePicture = {
        public_id: cloudinary_data.public_id,
        url: cloudinary_data.url,
      };
    }

    await user.save();
    res.status(200).send({
      message: "User updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Update error",
      success: false,
      error: error.message,
    });
  }
};
