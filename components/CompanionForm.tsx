"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import Image from "next/image";
import {redirect} from "next/navigation";
import {createCompanion} from "@/lib/actions/companions.actions";

const formSchema = z.object({
  name: z.string().min(2, { message: "Companion name is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  voice: z.string().min(2, { message: "Voice type is required" }),
  style: z.string().min(2, { message: "Speaking style is required" }),
  duration: z.coerce.number().min(2, { message: "Duration is required" }),
});

interface CompanionFormProps {
    userId: string;
}

const CompanionForm = ({ userId }: CompanionFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form with values:', values);
      const companion = await createCompanion({
        ...values,
        userId: userId
      });

      console.log('Companion created:', companion);
      
      if (companion?.id) {
        // Use Next.js router for client-side navigation
        router.push(`/companions/${companion.id}`); // Fixed route to use 'companions'
        router.refresh(); // Ensure the page updates
      } else {
        throw new Error('No companion ID returned');
      }
    } catch (error) {
      console.error('Failed to create companion:', error);
      // Show error to user
      alert(error instanceof Error ? error.message : 'Failed to create companion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input
                  className=" !border-black !bg-white focus-visible:!ring-0  focus-visible:!border-black !w-full"
                  placeholder="Enter the companion name - ex: Calculus King"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className=" !border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Select the subject - ex: Math" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Input
                  className=" !border-black !bg-white focus-visible:!ring-0  focus-visible:!border-black !w-full"
                  placeholder="Enter the topic you want to learn - ex: Derivatives"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className=" !border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speaking Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[ !border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className=" !border-black !bg-white focus-visible:!ring-0  focus-visible:!border-black !w-full"
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white rounded-xl cursor-pointer px-[82px] py-[12px] flex items-center gap-2 font-bold ${isSubmitting ? 'opacity-70' : ''}`}
          style={{ backgroundColor: "#fe5933" }}
        >
          {isSubmitting ? 'Creating...' : 'Create Companion'}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
