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
  company: z.string().nonempty("Company is required"),
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
        <h1 className="text-2xl font-bold text-center">Registration</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First name</Label>
              <Input 
                type="text" 
                placeholder="Enter your first name" 
                {...register("firstName")} 
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label>Last name</Label>
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
              <Label>Email</Label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                {...register("email")} 
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Label>Company</Label>
              <Input 
                type="text" 
                placeholder="Enter your company name" 
                {...register("company")} 
                aria-invalid={errors.company ? "true" : "false"}
              />
              {errors.company && <p className="text-red-500">{errors.company.message}</p>}
            </div>
          </div>
          <div>
            <Label>Date of birth</Label>
            <Input 
              type="date" 
              {...register("dateOfBirth")} 
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
            />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
          </div>
          <Button className="mt-8" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
