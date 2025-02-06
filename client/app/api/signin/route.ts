// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '@/lib/models/User';
// import dbConnect from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   if (req.method !== 'POST') {
//     return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
//   }

//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     await dbConnect();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid credentials !' }, { status: 400 });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return NextResponse.json({ message: 'Invalid credentials !' }, { status: 400 });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message || "Something went wrong" }, { status: (error as any)?.status || 500 });
//     }
//   }
// }
