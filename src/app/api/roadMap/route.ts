import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const roadmapData = [
            {
                name: 'End of Q1',
                goals: [
                    'User Authentication and Authorization',
                    'Basic Dashboard',
                    'System and Database Design',
                ],
            },
        ];
        return NextResponse.json(roadmapData, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
