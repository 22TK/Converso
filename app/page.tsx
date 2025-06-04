import CompanionCard from '@/components/companionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/CTA'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className='flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        {/* <CompanionCard id='123' name="Neura The Brainy Explorer" topic='Neural Network of the Brain' /> */}
        <CompanionCard />
        <CompanionCard />
      </section>
      <section className='flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        <CompanionList />
        <Cta />
      </section>
    </main>
  )
}

export default Page