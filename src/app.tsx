import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./styles/global.css";
import { zodResolver } from "@hookform/resolvers/zod";

// Definindo o esquema de validação com mensagens de erro
const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
});

type FormData = z.infer<typeof schema>;

export function App() {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-100">
      <div className="w-full max-w-2xl bg-white shadow rounded-md p-8">
        <h1 className="text-2xl font-bold text-center">Registro</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input 
                type="text" 
                placeholder="Enter your first name" 
                {...register("firstName")} 
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input 
                type="text" 
                placeholder="Enter your last name" 
                {...register("lastName")} 
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>E-mail</Label>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email")} 
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Data de aniversário</Label>
            <Input 
              type="date" 
              {...register("dateOfBirth")} 
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
            />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
          </div>
          </div>
          <Button className="mt-8" type="submit">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
