import dbConnect from "@/lib/db";
import User from "../../../lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { getUserIdFromToken } from "@/lib/auth";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (req: NextRequest) => {
    try {

        const userId = await getUserIdFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: "User does not exists " }, { status: 404 })
        }

        await dbConnect();
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ user: user }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message || "Something went wrong" }, { status:  500 });
        }
      }
};


export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        await dbConnect();

        const newUser = new User(body);

        await newUser.save();
        return NextResponse.json({ message: "User Created Successfully", data: newUser }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
        }
    }
};

export const PATCH = async (req: Request) => {
    try {
        const { userId, newUserName } = await req.json();

        await dbConnect();

        if (!userId || !newUserName) {
            return NextResponse.json({ message: "Id and new username not found" }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid User Id" }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUserName },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: " User not found in database" }, { status: 400 })
        }
        return NextResponse.json({ messgae: "User Updated", data: updatedUser }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message || "Something went wrong" }, { status:500 });
        }
      }
};



export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "Id not found" }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid User Id" }, { status: 400 });
        }

        await dbConnect();

        const deleteUser = await User.findByIdAndDelete(
            new ObjectId(userId)
        )

        if (!deleteUser) {
            return NextResponse.json({ message: " User not found in database" }, { status: 400 })
        }
        return NextResponse.json({ messgae: "User Deleted", data: deleteUser }, { status: 200 });
    }catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
        }
      }
}


