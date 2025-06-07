import CompanionCard from '@/components/companionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <section className='flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        <CompanionCard id='1' name="Neura The Brainy Explorer" topic='Neural Network of the Brain' subject="science" duration={45} color='#efd0ff' />
        <CompanionCard id='2' name="Countsy the Number Wizard" topic='Derivatives & Integrals' subject="maths" duration={30} color='#ffda6e' />
        <CompanionCard id='3' name="Verba the Vocabulary Builder" topic='English Literature' subject="language"  duration={30} color='#bde7ff' />
      </section>
      <section className='flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        <CompanionList 
        // title='Recently Completed Sessions'
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <Cta />
      </section>
    </main>
  )
}

export default Page