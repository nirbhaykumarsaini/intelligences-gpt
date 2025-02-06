// import bcrypt from 'bcryptjs';
// import User from '@/lib/models/User';
// import dbConnect from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {

//   if (req.method !== 'POST') {
//     return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
//   }
  
//   try {

//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }
//     await dbConnect();
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({ message: 'User already exists' }, { status: 200 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return NextResponse.json({ message: 'User registered successfully',newUser }, { status: 201 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message || "Something went wrong" }, { status: (error as any)?.status || 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   try {
//     if (req.method !== 'GET') {
//       return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
//     }

//     await dbConnect();

//     const users = await User.find();
    
//     return NextResponse.json({ message: 'User registered successfully',users }, { status: 201 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message || "Something went wrong" }, { status: (error as any)?.status || 500 });
//     }
//   }
// }
