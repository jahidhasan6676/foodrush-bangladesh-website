

export const verifyRole = (session,expectedRole) =>{
    if(!session || session.user.role !== expectedRole){
        // return NextResponse.json({message: "Access Denied"}, {status: 403})
        return false;
    }
    return true;
}