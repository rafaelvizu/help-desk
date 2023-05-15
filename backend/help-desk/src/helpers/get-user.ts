import User from "../models/user";


export default async function GetUser(email: string) : Promise<any | null>
{
     const user = await User.findOne({
          where: {
               email,
          },
          raw: true,
     });

     if (!user) return null;

     return user;
}