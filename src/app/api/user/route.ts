export async function name(request:Request) {

    const userData = await request.json();

    return Response.json({message:"Hello world",userData});
    
}