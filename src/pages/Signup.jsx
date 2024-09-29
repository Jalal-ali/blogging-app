import { useForm } from "react-hook-form"

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    
      const onSubmit = (data) => console.log(data)
    


  return (
    <>
<div className="bg-gradient-to-r from-blue-300 to-purple-500 h-screen lg:h-auto flex justify-center items-center">
    <div className="py-8 m-5 mx-3 px-16 max-w-md bg-white bg-opacity-70 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Blogging App</h1>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
        <p className="text-md text-center text-gray-700 mb-8">Sign Up</p>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-5">
      <label className="text-gray-700 font-semibold mb-2" htmlFor="firstName">First-Name</label>
      {errors.firstName ? <input {...register("firstName", { required: true })} className="bg-transparent border-2 rounded-lg shadow border-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="firstName" />
 :       <input {...register("firstName", { required: true })} className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="firstName" />}
      {errors.firstName && <span className="text-red-600">First-Name is required.</span>}
      </div>
      <div className="mb-5">
      <label className="text-gray-700 font-semibold mb-2" htmlFor="lastName">Last-Name</label>
      {errors.lastName ? <input {...register("lastName", { required: true })} className="bg-transparent border-2 rounded-lg shadow border-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="lastName" />
 :       <input {...register("lastName", { required: true })} className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="lastName" />}
      {errors.lastName && <span className="text-red-600">Last-Name is required.</span>}
      </div>
      <div className="mb-5">
      <label className="text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
      {errors.email ? <input type="email" {...register("email", { required: true })} className="bg-transparent border-2 rounded-lg shadow border-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="email" />
 :       <input type="email" {...register("email", { required: true })} className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="email" />}
      {errors.email && <span className="text-red-600">Email is required.</span>}
      </div>
      <div className="mb-5">
      <label className="text-gray-700 font-semibold mb-2" htmlFor="email">Password</label>
      {errors.password ? <input type="password" {...register("password", { required: true })} className="bg-transparent border-2 rounded-lg shadow border-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="password" />
:       <input type="password" {...register("password", { required: true })} className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal" id="password" />
}
      {errors.password && <span className="text-red-600">Password is required.</span>}
      </div>

      <input  className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out my-5" type="submit" />
    </form>
    </div>
</div>

    
    </>
  )
}

export default Signup