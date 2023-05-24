export function formatCep(cep: string)
{
     cep = cep.slice(0, 9);
     cep = onlyNumbers(cep);
     return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatCpf(cpf: string)
{

     cpf = cpf.slice(0, 14);
     cpf = onlyNumbers(cpf);
     return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCnpj(cnpj: string)
{
          cnpj = cnpj.slice(0, 18);
          cnpj = onlyNumbers(cnpj);
          return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function formatPhone(phone: string)
{
     phone = phone.slice(0, 15);
     phone =  onlyNumbers(phone);
     return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}


export function onlyNumbers(value: string)
{
     return value.replace(/\D/g, '');
}