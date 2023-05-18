export function formatCep(cep: string)
{
     if (cep.length >= 8)
     {
          cep = cep.slice(0, 9);
          return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
     }

     return cep;
}