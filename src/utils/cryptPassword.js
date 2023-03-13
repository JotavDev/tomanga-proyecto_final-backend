import bcrypt from 'bcrypt'

export const createHash = password => {
    const salt = bcrypt.genSaltSync(10);
    const passEncrypted = bcrypt.hashSync(password, salt);
    
    return passEncrypted;
}

export const isValidPassword = (user, password) => {
    const response = bcrypt.compareSync(password, user.password);

    return response;
}