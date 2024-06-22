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

// =-=-=---=--=--=-=-=--=--=--=--=---=-=-=-=--


// Global table interface --------------------------------

interface Heder{
    title:string;
    value:string;
}
interface Body {
    id: number;
    [key: string]:any;
}

export interface Props {
  heders: Heder[];
  body: Body[];
  skelatonLoader: boolean;
  deletIdData?:(id:string)=> any;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=