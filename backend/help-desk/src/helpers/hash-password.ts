import bcrypt from 'bcryptjs';

export async function getHashPassword(password: string) : Promise<string>
{
     const salt = await bcrypt.genSalt(12);

     return await bcrypt.hash(password, salt);
}

export async function compareHashPassword(password: string, hash: string) : Promise<boolean>
{
     return await bcrypt.compare(password, hash);
}