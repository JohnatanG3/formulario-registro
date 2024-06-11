// Importando estilos globais e componentes necessários
import './styles/global.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from './components/ui/button';
import { useForm, Controller } from 'react-hook-form'; // Importando hooks do react-hook-form
import { z } from 'zod'; // Importando zod para validação de esquema
import { zodResolver } from '@hookform/resolvers/zod'; // Importando o resolver zod para o react-hook-form

// Definindo o esquema de validação usando zod
const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  company: z.string().nonempty('Company is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  dateOfBirth: z.object({
    month: z.string().nonempty('Month is required'),
    day: z.string().nonempty('Day is required'),
    year: z.string().nonempty('Year is required')
  })
});

type FormData = z.infer<typeof schema> // Definindo o tipo de dados do formulário com base no esquema

// Definindo o componente principal
export function App() {
  // Utilizando o hook useForm para gerenciar o estado do formulário
  const { handleSubmit, control, register, formState } = useForm<FormData>({
    resolver: zodResolver(schema) // Definindo o resolver para validação do esquema zod
  });

  // Função chamada ao enviar o formulário
  function onSubmit(data: any) {
    console.log(data); // Log dos dados do formulário
  }

  // Renderização do componente
  return (
    <div className='flex items-center justify-center h-screen w-full bg-zinc-100'>
      <div className='w-full max-w-2xl bg-white shadow rounded-md p-8'>
        <h1 className='text-2xl font-bold text-center'>Registration</h1>
        <form className='flex gap-6 flex-col mt-8' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Campo de entrada para o primeiro nome */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>First Name</Label>
              <Input type='text' placeholder="First Name" {...register('firstName')} />
              {/* Exibição da mensagem de erro se o campo tiver erro */}
              {formState.errors.firstName?.message && (
                <span className='text-red-500 text-xs'>{formState.errors.firstName.message}</span>
              )}
            </div>
            {/* Campo de entrada para o sobrenome */}
            <div>
              <Label>Last Name</Label>
              <Input type='text' placeholder="Last Name" {...register('lastName')} />
              {/* Exibição da mensagem de erro se o campo tiver erro */}
              {formState.errors.lastName?.message && (
                <span className='text-red-500 text-xs'>{formState.errors.lastName.message}</span>
              )}
            </div>
          </div>
          {/* Campo de entrada para o endereço de e-mail */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Email Address</Label>
              <Input type='email' placeholder="Email Address" {...register('email')} />
              {/* Exibição da mensagem de erro se o campo tiver erro */}
              {formState.errors.email?.message && (
                <span className='text-red-500 text-xs'>{formState.errors.email.message}</span>
              )}
            </div>
            {/* Campo de entrada para a empresa */}
            <div>
              <Label>Company</Label>
              <Input type='text' placeholder="Company" {...register('company')} />
              {/* Exibição da mensagem de erro se o campo tiver erro */}
              {formState.errors.company?.message && (
                <span className='text-red-500 text-xs'>{formState.errors.company.message}</span>
              )}
            </div>
          </div>
          {/* Campos de seleção para a data de nascimento */}
          <div className='grid grid-cols-3 gap-4 items-end'>
            {/* Selecionador para o mês */}
            <div>
              <Label>Date of Birth</Label>
              <Controller
                name="dateOfBirth.month"
                control={control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      {/* Opções de seleção para o mês */}
                      <SelectContent className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                          <SelectItem key={index} value={String(index + 1).padStart(2, '0')}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Exibição da mensagem de erro se o campo tiver erro */}
                    {formState.errors.dateOfBirth?.month && (
                      <span className='text-red-500 text-xs'>{formState.errors.dateOfBirth.month.message}</span>
                    )}
                  </>
                )}
              />
            </div>
            {/* Selecionador para o dia */}
            <div>
              <Controller
                name="dateOfBirth.day"
                control={control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      {/* Opções de seleção para o dia */}
                      <SelectContent className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                        {Array.from({ length: 31 }, (_, index) => (
                          <SelectItem key={index} value={String(index + 1).padStart(2, '0')}>{index + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Exibição da mensagem de erro se o campo tiver erro */}
                    {formState.errors.dateOfBirth?.day && (
                      <span className='text-red-500 text-xs'>{formState.errors.dateOfBirth.day.message}</span>
                    )}
                  </>
                )}
              />
            </div>
            {/* Selecionador para o ano */}
            <div>
              <Controller
                name="dateOfBirth.year"
                control={control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      {/* Opções de seleção para o ano */}
                      <SelectContent className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                        {Array.from({ length: new Date().getFullYear() - 1940 + 1 }, (_, index) => (
                          <SelectItem key={index} value={String(new Date().getFullYear() - index)}>{new Date().getFullYear() - index}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Exibição da mensagem de erro se o campo tiver erro */}
                    {formState.errors.dateOfBirth?.year && (
                      <span className='text-red-500 text-xs'>{formState.errors.dateOfBirth.year.message}</span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          {/* Botão de registro */}
          <Button className='mt-8' type='submit'>Register</Button>
        </form>
      </div>
    </div>
  )
}