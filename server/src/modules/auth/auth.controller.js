require("dotenv").config();
const User = require("./user.model");
const {
  findUserByEmail,
  createUser,
  comparePassword,
  generateToken,
  updateUserPassword,
  findUserById,
  findUserByIdAndDelete,
} = require("./auth.service");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message:
          "User already exists,please try a different username or email.",
      });
      return;
    }

    const newUser = await createUser({
      username,
      email,
      password,
      role: "user",
    });

    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "User register failed try again",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "User registered succesfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error,please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUserInDb = await findUserByEmail(email);
    if (!checkUserInDb) {
      res.status(400).json({
        success: false,
        message: "User does not exist,please login first.",
      });
      return;
    }

    const isPasswordMatching = await comparePassword(
      password,
      checkUserInDb.password
    );

    if (!isPasswordMatching) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password." });
    }

    const accessToken = generateToken(checkUserInDb);
    if (!accessToken) {
      res.status(400).json({
        success: false,
        message: "Login failed,please try again",
      });
      return;
    }

    //The cookie is included in the response headers and sent to the client's browser.
    //When the client receives the response, the browser will store the cookie. On subsequent requests to the same domain, the browser will automatically include the cookie in the request headers, allowing the server to identify the client using the JWT token stored in the cookie.
    //Once the cookie is stored in the browser, it will automatically be included in the request headers for subsequent requests to the same domain. This means that the cookie will be sent with every request to your server, allowing the server to identify the client using the JWT token stored in the cookie.
    //This cookie will be included in the request headers for any subsequent requests to your server, not just requests to another route. This allows your server to authenticate the user on any route that requires authentication.
    //For example, if the user makes a request to /api/protected-route, the browser will automatically include the jwtToken cookie in the request headers,
    res.cookie("jwtToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error,please try again.",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again.",
    });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;
    const userToDelete = await findUserById(userId);
    if (!userToDelete) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    const isPasswordValid = await comparePassword(
      password,
      userToDelete.password
    );
    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
      return;
    }

    const deletedUser = await findUserByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(400).json({
        success: false,
        message: "Unable to delete user.Please try again",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted succesfully",
      deletedUser: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again.",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const { oldPassword, newPassword } = req.body;

    const currentUser = await findUserById(currentUserId);
    if (!currentUser) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    //check how we saved that user's password in database before.If it matches oldPass entered by client,then we allow client to update it.
    const checkIfPassEnteredTrue = await comparePassword(
      oldPassword,
      currentUser.password
    );
    if (!checkIfPassEnteredTrue) {
      res.status(400).json({
        success: false,
        message: "Invalid password entered.Please enter your current password.",
      });
      return;
    }

    const updatedUser = await updateUserPassword(currentUserId, newPassword);

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to update password, please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  deleteUserAccount,
  logoutUser,
};

/*
require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./user.model");


const registerUser = async (req,res) => {
  try {
    const { username, email, password, role } = req.body
    
    const existingUser = await User.findOne({
      $or:[{username:username},{email:email}]
    })
    if (existingUser) {
      res.status(400).json({
        success: false,
        message:"User already exists,please try a different username or email."
      })
      return;
    }

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role || "user"
      
    })

    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "User register failed try again"
      })
      return
    }

    res.status(201).json({
      success: true,
      message: "User registered succesfully",
      user:newUser
    })


  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message:"Internal server error,please try again."
    })
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUserInDb = await User.findOne({ email: email })
    if (!checkUserInDb) {
      res.status(400).json({
        success: false,
        message:"User does not exist,please login first."
      })
      return;
    }

      const isPasswordMatching = await bcrypt.compare(
        password,
        checkUserInDb.password
      ); 
      if (!isPasswordMatching) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password." });
    }
    
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: "1hr" };
    const accessToken = jwt.sign({
      userId: checkUserInDb._id,
      email: checkUserInDb.email,
      role:checkUserInDb.role
    }, secretKey, options)
    
    if (!accessToken) {
      res.status(400).json({
        success: false,
        message:"Login failed,please try again"
      })
      return;
    }

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      accessToken: accessToken
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error,please try again.",
    });
  }
}



module.exports = {registerUser,loginUser}

*/
