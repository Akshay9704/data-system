import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false }) //Save data in database and Check necessary fields eg: password

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, dob, username, password } = req.body;
    if (!fullName || !email || !dob || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        fullName,
        email,
        dob,
        password,
        username
    });

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Store refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Prepare response
    const createUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json(new ApiResponse(200, { user: createUser, accessToken, refreshToken }, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    if (!username) {
        throw new ApiError(400, "Username is required")
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            throw new ApiError(404, "User does not exist")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged in successfully"
                )
            )
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"))
})

export { registerUser, loginUser, getCurrentUser, logoutUser };