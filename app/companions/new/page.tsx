import CompanionForm from '@/components/CompanionForm'
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

const newCompanion = async() => {
  const {userId} = await auth();

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
      <article className='w-full gap-4 flex flex-col'>
        <h1>New Companion</h1>
        <CompanionForm userId={userId} />
      </article>
    </main>
  )

}

export default newCompanion
