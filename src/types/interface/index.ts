// --------- Authorization  -------------

export interface Signin{
    username: string;
    password: string;
}

export interface Signup extends Signin{
    email: string;
    lastname: string;
    phonenumber: string;
}




export interface Request{
    signin:(data:Signin)=>any,
    signup:(data:Signup)=>any,
}

// ------------------------------------