


export async function GET() {
    try {
        const availabilityConfiguration = await findAvailabilityConfiguration();
        console.log(availabilityConfiguration);
        return NextResponse.json({ availabilityConfiguration }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}