const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i

export const isValidEmail = (email:string):boolean=>{
  return emailRegex.test(email)
}


export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) 
    ? undefined
    : 'O e-mail não parece ser válido';
}